## Nomie / CouchDB Setup

### Update: Don't want to setup your own server?

Check out [this blog post on setting up IBM's Cloudant CouchDB](https://blog.nomie.io/nomie-syncing-backup-with-ibmcloudant/).

### Setup your own CouchDB Server

2 years ago (as of this writing) I started building a little app to track my behaviors, moods and activities. Today that little app is called [Nomie](https://nomie.io), and it's used to track 125 different aspects of my life (sleeping, drinking, eating, sex, drugs, mood, love, knitting, and everything in between).

One goal of mine for Nomie was full syncing between my iPad and my iPhone, without a centralized "cloud" server.  After many wrong turns and failed attempts, [CouchDB](http://couchdb.apache.org/) came out the victor with its  offline-first support, versioning and overall ease of use.

**Tech Warning:** If you're not comfortable using a (linux / mac) command line - stick with Dropbox syncing until I get an easier solution in place.  That being said, if you're willing to take the plunge, we're going to be setting up CouchDB on a Digital Ocean server.


#1. Setup a $5 a month [Digital Ocean](https://m.do.co/c/c39776e3cc11) server

Create a [Digital Ocean](https://m.do.co/c/c39776e3cc11) account if you don't already have one.

Next you'll need to setup an Ubuntu 14.04 Droplet. [Click here to setup an Ubuntu 14.04, 512mb server in the NY datacenter. ](https://cloud.digitalocean.com/droplets/new?size=512mb&region=nyc2&distro=ubuntu&distroImage=ubuntu-14-04-x64)


Once you've setup your sever, you'll be emailed the password for the root user (if you're not using SSH keys).

You should be able to login to your new server using the following:

``ssh root@XXX.XXX.XXX``

replace XXX.XXX.XXX with your Droplets IP address

#2. Install Couch

## Base requirements

```
apt-get update
apt-get install software-properties-common -y
add-apt-repository ppa:couchdb/stable -y
apt-get update
```

## Remove any old CouchDB


```
apt-get remove couchdb couchdb-bin couchdb-common -y
```

## Install Fresh CouchDB

```
apt-get install couchdb -y
```

#3. Configure Couch

## Setup an admin user named ``nomie``

```
HOST=http://localhost:5984
curl -X PUT $HOST/_config/admins/nomie -d '"MYPASSWORD"'
```

## Setup CORS
In order to for Nomie the app to communicate with your server, CouchDB needs to allow external calls to interact with its data, this is called [Cross-origin resource sharing](http://docs.couchdb.org/en/1.3.0/cors.html).

```
AUTHOST=http://nomie:MYPASSWORD@localhost:5984
curl -X PUT $AUTHOST/_config/httpd/enable_cors -d '"true"'
curl -X PUT $AUTHOST/_config/cors/origins -d '"*"'
curl -X PUT $AUTHOST/_config/cors/credentials -d '"true"'
curl -X PUT $AUTHOST/_config/cors/methods -d '"GET, PUT, POST, HEAD, DELETE"'
curl -X PUT $AUTHOST/_config/cors/headers -d '"accept, authorization, content-type, origin, referer, x-csrf-token"'
```
## Allow access to the outside world

```
curl -X PUT $AUTHOST/_config/httpd/bind_address -d '"0.0.0.0"'
```

## Create the Nomie database

Nomie will automatically push and pull data to the following database names  **username**\_events, **username**\_trackers, **username**\_meta


```
curl -X PUT $AUTHOST/nomie_events
curl -X PUT $AUTHOST/nomie_meta
curl -X PUT $AUTHOST/nomie_trackers
```
#4. Test the connection

We should have everything we need to start syncing with [Nomie](https://nomie.io).

## Adding your account to Nomie

1. Tap the More (**•••**) tab.
2. Tap **Add Account**
3. Tap **Self Hosted**

![](http://snap.icorbin.com/Screen-Shot-2016-06-06-10-41-31.png)

1. Disable "Use Secure Connection"
2. Enter your IP address and port :5984
3. Enter username and password
4. Tap login
5. If all goes well, you'll have the option to enable the connection and it should start syncing.

#5. Securing your Server

What we've setup, is a good primer, **but YOU SHOULD NOT USE THIS** unless you plan to get a domain, and secure CouchDB.

- [Get my domain to Digital Ocean ](https://www.digitalocean.com/community/tutorials/how-to-point-to-digitalocean-nameservers-from-common-domain-registrars)
- [Securing CouchDB with HTTPS](https://cwiki.apache.org/confluence/pages/viewpage.action?pageId=48203146)

## Don't want to mess with Securing a server?

One option is to install CouchDB on a computer at home. Nomie would then only sync when you're at home on the same network.
