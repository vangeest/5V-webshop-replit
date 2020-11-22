#!/bin/bash
set -e

cd $THEIA_WORKSPACE_ROOT
psql < sql/bootstrap_db.sql
psql --username=api  shop < sql/create_tables.sql
psql --username=api  shop < sql/seed.sql

echo "SQL loaded ok"