#! /bin/bash

# Local command to trigger uploading of pseudodata to local mongo server
# Auth must match value of process.env.UPLOAD_PSEUDO_DATA_KEY
curl -X GET -H "Authorization: 77543e3536f1dfcc6bafffcdf65077f6" -L "http://localhost:5000/admin/loaddata"

