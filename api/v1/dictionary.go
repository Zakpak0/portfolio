package dictionary

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"

	"cloud.google.com/go/firestore"
	"zakharyoliver.com/api/pkg/firebase"
)

type DictionaryQuery struct {
	Segments []string
}
type DictionaryBody struct {
	Content map[string]interface{} `json:"content"`
}

func Main(w http.ResponseWriter, r *http.Request) {
	verb := r.Method
	query := r.URL.Query()
	var params DictionaryQuery
	var path string
	for key, value := range query {
		switch key {
		case "segments":
			path = value[0]
			break
		default:
			break
		}
	}
	params.Segments = strings.Split(path, "/")
	if len(params.Segments) == 0 {
		fmt.Fprintf(w, "Error: No segments provided")
		return
	}
	segments := params.Segments
	ctx := context.Background()
	var body DictionaryBody
	if verb != "GET" {
		_body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			fmt.Fprintf(w, "Error reading request body: %v", err)
			return
		}
		if err := json.Unmarshal(_body, &body); err != nil {
			fmt.Fprintf(w, "Error parsing request body: %v", err)
			return
		}
		if body.Content == nil {
			fmt.Fprintf(w, "Error: No content provided")
			return
		}
	}
	fb := firebase.Firebase(ctx)
	db, err := fb.Firestore(ctx)
	if err != nil {
		fmt.Fprintf(w, "Error initializing Firestore: %v", err)
		return
	}
	col := db.Collection("dictionary")
	child := segments[0]
	doc := col.Doc(child)
	switch verb {
	case "GET":
		get(w, r, doc, &ctx, &params)
		break
	case "POST":
		post(w, r, doc, &ctx, &params, &body)
		break
	case "PUT":
		put(w, r, doc, &ctx, &params, &body)
		break
	case "DELETE":
		delete(w, r, doc, &ctx, &params, &body)
		break
	default:
		get(w, r, doc, &ctx, &params)
	}
}

func get(w http.ResponseWriter, r *http.Request, doc *firestore.DocumentRef, ctx *context.Context, params *DictionaryQuery) {
	field, err := doc.Get(*ctx)
	if err != nil {
		fmt.Fprintf(w, "Error getting document: %v", err)
		return
	}
	if field == nil {
		fmt.Fprintf(w, "Error: No document found")
		return
	}
	parent := field.Data()
	if len(params.Segments) > 1 {
		segments := params.Segments[1:]
		_, nthChild, err := findNthChild(parent, segments)
		if err != nil {
			fmt.Fprintf(w, "Error getting document: %v", err)
			return
		}
		fmt.Fprintf(w, "%v", &nthChild)
	} else {
		fmt.Fprintf(w, "%v", parent)
	}
	return
}
func post(w http.ResponseWriter, r *http.Request, doc *firestore.DocumentRef, ctx *context.Context, params *DictionaryQuery, body *DictionaryBody) {
	if len(params.Segments) > 1 {
		field, err := doc.Get(*ctx)
		if err != nil {
			doc.Set(*ctx, body.Content)
			fmt.Fprintln(w, body.Content)
			return
		}
		parent := field.Data()
		segments := params.Segments[1:]
		newParent, err := modifyNthChild(parent, segments, body.Content)
		if err != nil {
			fmt.Fprintf(w, "Error getting document: %v", err)
			return
		}
		_, err = doc.Set(*ctx, newParent)
		if err != nil {
			fmt.Fprintf(w, "Error setting document: %v", err)
			return
		} else {
			fmt.Fprintln(w, newParent)
			return
		}
	}
	fmt.Fprintln(w, "POST")
}
func put(w http.ResponseWriter, r *http.Request, doc *firestore.DocumentRef, ctx *context.Context, params *DictionaryQuery, body *DictionaryBody) {
	fmt.Fprintln(w, "PUT")
}
func delete(w http.ResponseWriter, r *http.Request, doc *firestore.DocumentRef, ctx *context.Context, params *DictionaryQuery, body *DictionaryBody) {
	fmt.Fprintln(w, "DELETE")
}

func findNthChild(parent map[string]interface{}, segments []string) (*map[string]interface{}, *map[string]interface{}, error) {
	nthChild := parent
	for i, segment := range segments {
		child, ok := nthChild[segment].(map[string]interface{})
		if !ok {
			return nil, nil, fmt.Errorf("Error: No child found")
		}
		if i == len(segments)-1 {
			return &nthChild, &child, nil
		}
		nthChild = child
	}
	return nil, nil, fmt.Errorf("Error: No child found")
}

func modifyNthChild(parent map[string]interface{}, segments []string, content map[string]interface{}) (map[string]interface{}, error) {
	length := len(segments)
	children := make([]map[string]interface{}, 0)
	nthChild := parent
	indexRange := length - 1
	i := 0
	for hasProperties(nthChild, "") || i < length {
		var segment string
		if i < length {
			segment = segments[i]
			// if i == length {
			// 	break
			// }
			child, ok := nthChild[segment].(map[string]interface{})
			if !ok {
				if i == indexRange {
					nthChild[segment] = content
					break
				} else {
					child = make(map[string]interface{})
					child[segment] = make(map[string]interface{})
					children = append(children, copyMap(child)) // Create a copy of child
					nthChild = child
				}
			} else {
				if i == indexRange {
					nthChild[segment] = content
					break
				} else {
					children = append(children, copyMap(child)) // Create a copy of child
					nthChild = child
				}
			}
			i++
		}
	}
	children = reverse(children)
	var newParent map[string]interface{}
	for i, child := range children {
		if i == 0 {
			newParent = child
		} else {
			child[segments[indexRange-i]] = newParent
			newParent = child
		}
	}
	return newParent, nil
}
func copyMap(original map[string]interface{}) map[string]interface{} {
	copied := make(map[string]interface{})
	for key, value := range original {
		copied[key] = value
	}
	return copied
}

func hasProperties(m map[string]interface{}, ignoreKey string) bool {
	for key := range m {
		if key != ignoreKey && key != "" {
			return true
		}
	}
	return false
}

func copyProperties(source map[string]interface{}, destination map[string]interface{}, ignoreKey string) map[string]interface{} {
	for key, value := range source {
		if key != ignoreKey && key != "" {
			destination[key] = value
		}
	}
	return destination
}
func reverse(arr []map[string]interface{}) []map[string]interface{} {
	left := 0
	right := len(arr) - 1

	for left < right {
		arr[left], arr[right] = arr[right], arr[left]
		left++
		right--
	}
	return arr
}
