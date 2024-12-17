# note lots of other good options

# LAT_MIN="45.4"
# LAT_MAX="45.7"
# LON_MIN="-110.5"
# LON_MAX="-110.4"

# #variable choices: tmax,tmin,ws,vpd,vap,swe,srad,soil,q,ppt,pet,def,aet,PDSI
# VARIABLES=()

# #time range choices - 1958-01 to 2017-01
# TIME_START="1959-01-01T00%3A00%3A00Z"
# TIME_END="2017-12-01T00%3A00%3A00Z"
# #==========================================
# #       DOWNLOAD REQUESTS
# #==========================================
# ncssPath="http://thredds.northwestknowledge.net:8080/thredds/ncss"

# for variable in "${VARIABLES[@]}"
# do
# 	filename="agg_terraclimate_${variable}_1958_CurrentYear_GLOBE.nc"
# 	queryString="$ncssPath/${filename}?"
# 	queryString="$queryString&var=${variable}"
# 	queryString="$queryString&south=${LAT_MIN}&north=${LAT_MAX}&west=${LON_MIN}&east=${LON_MAX}&horizStride=1"
# 	queryString="$queryString&time_start=${TIME_START}&time_end=${TIME_END}&timeStride=1"
# 	queryString="$queryString&disableProjSubset=on&addLatLon=true&accept=netcdf"

# 	newfilename="terraclimate_${variable}.nc"
# 	wget -nc -c -nd "$queryString" -O "$newfilename"
# done

# read the “variable” parameter passed to the script
var=${1#--variable=}

LAT_MIN=49.674
LON_MIN=-14.015517
LAT_MAX=61.061
LON_MAX=2.0919117

curl -f "http://thredds.northwestknowledge.net:8080/thredds/ncss/agg_terraclimate_${var}_1958_CurrentYear_GLOBE.nc?var=${var}&south=${LAT_MIN}&north=${LAT_MAX}&west=${LON_MIN}&east=${LON_MAX}&disableProjSubset=on&addLatLon=true&horizStride=1&accept=netcdf" 
