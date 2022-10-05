FROM golang:1.19-alpine as build

COPY . $GOPATH/src/hello-go
WORKDIR $GOPATH/src/hello-go

RUN go build -v -o /hello-go $GOPATH/src/hello-go/main.go

FROM scratch

ENV APP_NAME hello-go

COPY --from=build /hello-go .

CMD [ "/hello-go" ]