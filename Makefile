build-dev:
	cd safe_pass_frontend && $(MAKE) build-dev 
	cd avc_backend && $(MAKE) build

run-dev:
	docker-compose -f docker-compose-dev.yml up

###
## only difference - Hot reload and mount the scource
build-local:
	cd safe_pass_frontend && $(MAKE) build-local 
	cd avc_backend && $(MAKE) build

run-local:
	set ENV=local && docker-compose -f docker-compose-production.yml up

### this will be run in digitalOcean VM
## Everything baked ito the image

build-production:
	cd safe_pass_frontend && $(MAKE) build-production 
	cd avc_backend && $(MAKE) build

run-production:
	ENV=production docker-compose -f docker-compose-production.yml up