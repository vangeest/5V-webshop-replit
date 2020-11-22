FROM gitpod/workspace-postgres
RUN curl https://cli-assets.heroku.com/install-ubuntu.sh | sudo sh
COPY scripts/.bash_aliases $HOME


