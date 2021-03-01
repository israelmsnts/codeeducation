from golang:1.16-buster as builder
workdir /app

COPY . .


run go mod init exercicio && \
    go build -o /app/bin/main .

from scratch 

copy --from=builder /app/bin/main .

cmd ["./main"]

