FROM denoland/deno:1.17.3

# The port that your application listens to.
EXPOSE 443

WORKDIR /deno_workdir



# Cache the dependencies as a layer (the following two steps are re-run only when deps.ts is modified).
# Ideally cache deps.ts will download and compile _all_ external files used in main.ts.
COPY ../backend/* .
#COPY deps.ts .
COPY ../containers/certbot/data/certbot/conf/live/jw-lab.physi.uni-heidelberg.de/* /root/
#RUN deno cache deps.ts

# These steps will be re-run upon each file change in your working directory:
#ADD . .

# Prefer not to run as root. its ok for us
USER root
# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache server.ts

CMD ["run", "--allow-net", "allow-read" "server.ts" ,"443"]