FROM kong/kong-gateway:3.2.2.1

COPY ./.docker/kong/declarative/api_gateway.yml /kong/declarative/api_gateway.yml

ENV KONG_DATABASE="off"
ENV KONG_DECLARATIVE_CONFIG="/kong/declarative/api_gateway.yml"

EXPOSE 8000

CMD ["kong", "docker-start"]
