FROM gitpod/workspace-full:latest

# Install Python 3.9 using pyenv
RUN pyenv install 3.9

# Set Python 3.9 as the default version
RUN pyenv global 3.9
