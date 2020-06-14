# Vova Stern for MoonActive
## Run it
```
docker-compose pull &&  docker-compose build --no-cache &&  docker-compose up -d
```

## How to use
### the API expose HTTP route:
```
curl -X POST http://localhost:3000/message -H 'Content-Type: application/json' \
  -d '{
	"time": "2020-06-13T22:47:66.966Z",
	"message": "Hello world"
}'
```

### Unfinished things
* Unit test
* Validation
