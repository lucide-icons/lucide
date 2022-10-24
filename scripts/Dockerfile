## This Dockerfile is for building image for github actions
FROM debian:stable-slim

RUN apt-get update
RUN apt-get install zlib1g-dev fontforge git build-essential ruby-full -y

# sfnt2woff
RUN git clone https://github.com/bramstein/sfnt2woff-zopfli.git sfnt2woff-zopfli
WORKDIR /sfnt2woff-zopfli
RUN make
RUN cp sfnt2woff-zopfli /usr/local/bin/sfnt2woff

# WOFF2
WORKDIR /
RUN git clone --recursive https://github.com/google/woff2.git
WORKDIR /woff2
RUN make clean all
RUN mv woff2_compress /usr/local/bin/
RUN mv woff2_decompress /usr/local/bin/

RUN gem install fontcustom
