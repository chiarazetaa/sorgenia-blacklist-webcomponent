FROM nginxinc/nginx-unprivileged:bookworm

# copy `esm` module to dedicated folder (root and new folder folder with SHA)
COPY dist/blacklist/ /usr/share/nginx/html/webcomponents/blacklist/dist/esm/

EXPOSE 8080
