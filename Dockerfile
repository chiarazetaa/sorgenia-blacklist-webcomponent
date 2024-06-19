FROM nginxinc/nginx-unprivileged:latest

# copy `esm` module to dedicated folder (root and new folder folder with SHA)
COPY dist/blacklist/ /usr/share/nginx/html/webcomponents/blacklist/dist/esm/
COPY dist/blacklist/ /usr/share/nginx/html/webcomponents/blacklist/$COMMIT_SHA/dist/esm/

EXPOSE 8080
