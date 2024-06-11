FROM nginx:alpine

# copy `esm` module to dedicated folder (root and new folder folder with SHA)
COPY dist/b2w-blacklist-sorgenia/ /usr/share/nginx/html/webcomponents/b2w-blacklist-sorgenia/dist/esm/
COPY dist/b2w-blacklist-sorgenia/ /usr/share/nginx/html/webcomponents/b2w-blacklist-sorgenia/$COMMIT_SHA/dist/esm/

EXPOSE 80
