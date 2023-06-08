package firebase

import (
	"context"
	"log"
	"os"

	fb "firebase.google.com/go/v4"
	env "github.com/joho/godotenv"
)

func Firebase(ctx context.Context) *fb.App {
	err := env.Load()
	if err != nil {
		log.Default().Print("No .env file found, using environment variables and Production Credentials")
	}
	pid := os.Getenv("PROJECT_ID")
	if pid == "" {
		log.Fatal("Error loading PROJECT_ID from .env file")
	}
	config := &fb.Config{
		ProjectID: pid,
	}
	if value := os.Getenv("FIRESTORE_EMULATOR_HOST"); value != "" {
		log.Printf("Using Firestore Emulator: %s", value)
		app, err := fb.NewApp(ctx, config)
		if err != nil {
			log.Fatalln(err)
		}
		return app
	} else {
		app, err := fb.NewApp(ctx, config)
		if err != nil {
			log.Fatalln(err)
		}
		return app
	}
}
