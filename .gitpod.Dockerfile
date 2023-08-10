FROM gitpod/workspace-full:latest
# Install Python 3.9
RUN sudo apt-get update && \
    sudo apt-get install -y python3.9 python3.9-distutils && \
    sudo update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.9 1 && \
    curl -s https://bootstrap.pypa.io/get-pip.py | python3

# Set Python 3.9 as the default version
RUN sudo update-alternatives --set python3 /usr/bin/python3.9