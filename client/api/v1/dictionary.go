package dictionary

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strings"

	"cloud.google.com/go/firestore"
	"zakharyoliver.com/client/pkg/firebase"
)

type DictionaryQuery struct {
	Segments []string
}
type DictionaryBody struct {
	Content map[string]interface{} `json:"content"`
}

func Main(w http.ResponseWriter, r *http.Request) {
	var builder ResponseBuilder = ResponseBuilder{
		response: &DictionaryResponse{
			Content: make(map[string]interface{}),
		},
	}
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
		builder.SetContent(nil)
		builder.SetError("No segments provided")
		builder.response.SendJSON(w, r, builder.response)
		return
	}
	segments := params.Segments
	ctx := context.Background()
	var body DictionaryBody
	if verb != "GET" {
		_body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			builder.SetContent(nil)
			builder.SetError("Error reading request body")
			builder.response.SendJSON(w, r, builder.response)
			return
		}
		if err := json.Unmarshal(_body, &body); err != nil {
			builder.SetContent(nil)
			builder.SetError("Error parsing request body")
			builder.response.SendJSON(w, r, builder.response)
			return
		}
		if body.Content == nil {
			builder.SetContent(nil)
			builder.SetError("Error: No content provided")
			builder.response.SendJSON(w, r, builder.response)
			return
		}
	}
	fb := firebase.Firebase(ctx)
	db, err := fb.Firestore(ctx)
	if err != nil {
		builder.SetContent(nil)
		builder.SetError("Error initializing Firestore")
		builder.response.SendJSON(w, r, builder.response)
		return
	}
	col := db.Collection("dictionary")
	fmt.Print(segments, "segments")
	child := segments[0]
	doc := col.Doc(child)
	switch verb {
	case "GET":
		get(w, r, doc, &ctx, &params, &builder)
	case "POST":
		post(w, r, doc, &ctx, &params, &body, &builder)
	case "PUT":
		put(w, r, doc, &ctx, &params, &body, &builder)
	case "DELETE":
		delete(w, r, doc, &ctx, &params, &body, &builder)
	default:
		get(w, r, doc, &ctx, &params, &builder)
	}
}

func get(w http.ResponseWriter, r *http.Request, doc *firestore.DocumentRef, ctx *context.Context, params *DictionaryQuery, builder *ResponseBuilder) {
	field, err := doc.Get(*ctx)
	if err != nil {
		builder.SetContent(nil)
		builder.SetError("Error getting document")
		builder.response.SendJSON(w, r, builder.response)
		return
	}
	if field == nil {
		builder.SetContent(nil)
		builder.SetError("No document found")
		builder.response.SendJSON(w, r, builder.response)
		return
	}
	parent := field.Data()
	if len(params.Segments) > 1 {
		segments := params.Segments[1:]
		_, nthChild, err := findNthChild(parent, segments)
		if err != nil {
			builder.SetContent(nil)
			builder.SetError("Error getting document")
			builder.response.SendJSON(w, r, builder.response)
			return
		}
		builder.SetContent(*nthChild)
		builder.SetError("")
		builder.response.SendJSON(w, r, builder.response)
		return
	} else {
		builder.SetContent(parent)
		builder.SetError("")
		builder.response.SendJSON(w, r, builder.response)
		return
	}
}
func post(w http.ResponseWriter, r *http.Request, doc *firestore.DocumentRef, ctx *context.Context, params *DictionaryQuery, body *DictionaryBody, builder *ResponseBuilder) {
	_, err := doc.Get(*ctx)
	if err != nil {
		doc.Set(*ctx, params.Segments[0])
	}
	if len(params.Segments) > 1 {
		segments := params.Segments[1:]
		var update []firestore.Update
		for _, value := range body.Content {
			update = append(update, firestore.Update{
				FieldPath: segments,
				Value:     value,
			})
		}
		res, err := doc.Update(*ctx, update)
		if err != nil {
			builder.SetContent(nil)
			builder.SetError("Error setting document")
			builder.response.SendJSON(w, r, builder.response)
			return
		} else {
			timestamp := map[string]interface{}{
				"timestamp": res,
			}
			builder.SetContent(timestamp)
			builder.SetError("")
			builder.response.SendJSON(w, r, builder.response)
			return
		}
	} else {
		// get the key and the value from the content
		var update []firestore.Update
		for key, value := range body.Content {
			update = append(update, firestore.Update{
				Path:  key,
				Value: value,
			})
		}
		doc.Update(*ctx, update)
		res, err := doc.Update(*ctx, update)
		if err != nil {
			builder.SetContent(nil)
			builder.SetError("Error setting document")
			builder.response.SendJSON(w, r, builder.response)
			return
		} else {
			timestamp := map[string]interface{}{
				"timestamp": res,
			}
			builder.SetContent(timestamp)
			builder.SetError("")
			builder.response.SendJSON(w, r, builder.response)
			return
		}
	}
}
func put(w http.ResponseWriter, r *http.Request, doc *firestore.DocumentRef, ctx *context.Context, params *DictionaryQuery, body *DictionaryBody, builder *ResponseBuilder) {
	_, err := doc.Get(*ctx)
	if err != nil {
		doc.Set(*ctx, params.Segments[0])
	}
	if len(params.Segments) > 1 {
		segments := params.Segments[1:]
		var update []firestore.Update
		for _, value := range body.Content {
			update = append(update, firestore.Update{
				FieldPath: segments,
				Value:     value,
			})
		}
		res, err := doc.Update(*ctx, update)
		if err != nil {
			builder.SetContent(nil)
			builder.SetError("Error updating document")
			builder.response.SendJSON(w, r, builder.response)
			return
		} else {
			timestamp := map[string]interface{}{
				"timestamp": res,
			}
			builder.SetContent(timestamp)
			builder.SetError("")
			builder.response.SendJSON(w, r, builder.response)
			return
		}
	} else {
		// get the key and the value from the content
		var update []firestore.Update
		for key, value := range body.Content {
			update = append(update, firestore.Update{
				Path:  key,
				Value: value,
			})
		}
		doc.Update(*ctx, update)
		res, err := doc.Update(*ctx, update)
		if err != nil {
			builder.SetContent(nil)
			builder.SetError("Error updating document")
			builder.response.SendJSON(w, r, builder.response)
			return
		} else {
			timestamp := map[string]interface{}{
				"timestamp": res,
			}
			builder.SetContent(timestamp)
			builder.SetError("")
			builder.response.SendJSON(w, r, builder.response)
			return
		}
	}
}
func delete(w http.ResponseWriter, r *http.Request, doc *firestore.DocumentRef, ctx *context.Context, params *DictionaryQuery, body *DictionaryBody, builder *ResponseBuilder) {
	_, err := doc.Get(*ctx)
	if err != nil {
		doc.Set(*ctx, params.Segments[0])
	}
	if len(params.Segments) > 1 {
		segments := params.Segments[1:]
		var update []firestore.Update
		for range body.Content {
			update = append(update, firestore.Update{
				FieldPath: segments,
				Value:     firestore.Delete,
			})
		}
		res, err := doc.Update(*ctx, update)
		if err != nil {
			builder.SetContent(nil)
			builder.SetError("Error deleting document")
			builder.response.SendJSON(w, r, builder.response)
			return
		} else {
			timestamp := map[string]interface{}{
				"timestamp": res,
			}
			builder.SetContent(timestamp)
			builder.SetError("")
			builder.response.SendJSON(w, r, builder.response)
			return
		}
	} else {
		// get the key and the value from the content
		var update []firestore.Update
		for key := range body.Content {
			update = append(update, firestore.Update{
				Path:  key,
				Value: firestore.Delete,
			})
		}
		doc.Update(*ctx, update)
		res, err := doc.Update(*ctx, update)
		if err != nil {
			builder.SetContent(nil)
			builder.SetError("Error deleting document")
			builder.response.SendJSON(w, r, builder.response)
			return
		} else {
			timestamp := map[string]interface{}{
				"timestamp": res,
			}
			builder.SetContent(timestamp)
			builder.SetError("")
			builder.response.SendJSON(w, r, builder.response)
			return
		}
	}
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

type DictionaryResponse struct {
	Content map[string]interface{} `json:"content"`
	Error   string                 `json:"string,omitempty"`
}

func (r *DictionaryResponse) SendJSON(w http.ResponseWriter, req *http.Request, results *DictionaryResponse) error {
	jsonResponse, err := json.Marshal(results)
	if err != nil {
		log.Fatal(err)
		return err
	}
	if results.Error != "" {
		w.WriteHeader(http.StatusBadRequest)
		w.Header().Set("Content-Type", "application/json")
		w.Write(jsonResponse)
	} else {
		w.WriteHeader(http.StatusOK)
		w.Header().Set("Content-Type", "application/json")
		w.Write(jsonResponse)
	}
	return nil
}

type ResponseBuilder struct {
	response *DictionaryResponse
}

func (r *ResponseBuilder) SetError(err string) {
	r.response.Error = err
}
func (r *ResponseBuilder) SetContent(content map[string]interface{}) {
	r.response.Content = content
}
