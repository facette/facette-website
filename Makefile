# -*- Makefile -*-

BUILD_ENV ?= production

NPM ?= npm
NPM_ARGS =

GULP ?= node_modules/.bin/gulp
GULP_ARGS =

GIT ?= git

GO_IMPORTS = facette \
             facette/backend \
             facette/catalog \
             facette/cmd/facette \
             facette/cmd/facettectl \
             facette/connector \
             facette/pattern \
             facette/series \
             facette/template \
             facette/timerange \
             facette/worker \
             httproute \
             httputil \
             jsonutil \
             logger \
             maputil \
             natsort \
             sliceutil \
             sqlstorage

all: build

clean:
	rm -rf public/

clean-all: clean
	rm -rf node_modules/

build: node_modules
	$(GULP) $(GULP_ARGS) build --env $(BUILD_ENV)
	for import in $(GO_IMPORTS); do \
		install -m 0755 -d public/$$import && \
		sed -e "s|%PATH%|$${import%%/*}|g" src/html/import.html >public/$$import/index.html; \
        done

release: clean
	$(GIT) stash save before-gh-pages
	$(MAKE) build
	$(GIT) checkout gh-pages
	cp -rf public/* .
	rm -rf public

node_modules:
	$(NPM) $(NPM_ARGS) install
