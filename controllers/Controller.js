
const pool = require('../queries')
const io = require('../index')
index = require('../index');
ind = require('../index');
var user = 0;



exports.getEvents = (req, res) => {
    const user = req.params.id;
    pool.query(`select *, isInterested('${user}', id) from event where end_date > current_date`, (e, results) => {
        if (e) {
            throw e;
        }
        res.send(results.rows);
    })
}

exports.setInterest = (req, res) => {
    const user = req.params.id;
    const eve = req.params.eventId;
    const pref = req.body;
    const start = new Date(pref.startEnd[0]);
    const end = new Date(pref.startEnd[1]);

    pool.query(`INSERT INTO INTERESTED VALUES('${user}', '${eve}', '${start.toLocaleDateString() + " " + start.toLocaleTimeString()}', '${end.toLocaleDateString() + " " + end.toLocaleTimeString()}', '${pref.gender}')`, (e, results) => {
        if (e) {
            throw e;
        }
        res.send(results.rows);
    })
}

exports.setConfirmed = (req, res) => {
    const user1 = req.body.fromId;
    const user2 = req.body.toId;
    const eventid = req.body.eventId;
    const startTime = new Date(req.body.startTime);

    const values = [user1, user2, eventid, startTime.toLocaleDateString()];

    pool.query(`insert into confirmed values($1, $2, $3, $4)`, values, (e, results) => {
        if (e) {
            throw e;
        }
        res.send(results.rows);
    })
}
exports.getMatches = (req, res) => {
    const user = req.params.id;
    const eve = req.params.eventId;
    const values = [user, eve];
    pool.query("select * from getcompbuddies($1, $2)", values, (e, results) => {
        if (e) {
            throw e;
        }
        res.send(results.rows);
    })
}

exports.setRequest = (req, res) => {
    const values = [req.params.fromId, req.params.toId, req.params.eventId];
    pool.query("insert into requests values($1, $2, $3)", values, (e, results) => {
        if (e) {
            throw e;
        }
        res.send(results.rows);
    })
}

exports.setUser = (req, res) => {
    console.log(req.body)
    const eb = req.body;

    pool.query(`INSERT INTO EVENTBUDDY VALUES('${eb.username}', '${eb.email}', '${eb.password}', '${eb.photo_link}', '${eb.dob.slice(0, 10)}', '${eb.gender}', '${eb.first_name}', '${eb.last_name}', '${eb.address}', '${eb.type1}', '${eb.type2}', '${eb.type3}', '${eb.occupation}')`, (e, results) => {
        if (e) {
            throw e;
        }

        res.send(results.rows);
    })
}
exports.editUser = (req, res) => {
    const eb = req.body;
    const values= [eb.username, eb.first_name, eb.last_name, eb.photo_link, eb.address, eb.occupation]
    console.log(values);
    pool.query(`UPDATE EVENTBUDDY SET FIRST_NAME = $2, LAST_NAME = $3, PHOTO_LINK = $4, ADDRESS = $5, OCCUPATION = $6 WHERE USERNAME = $1`, values, (e, results) => {
        if (e) {
            throw e;
        }
        res.send(results.rows);
    })
}
exports.setOrganizer = (req, res) => {
    console.log(req.body)
    const org = req.body;

    pool.query(`INSERT INTO ORGANIZER VALUES('${org.username}', '${org.email}', '${org.phone}', '${org.name}', '${org.password}', '${org.photo_link}')`, (e, results) => {
        if (e) {
            throw e;
        }
        res.send(results.rows);
    })
}
exports.authUser = (req, res) => {
    console.log(req.params)
    const eb = req.params;

    pool.query(`SELECT * FROM EVENTBUDDY WHERE email like '${eb.email}' AND password like '${eb.password}'`, (e, results) => {
        if (e) {
            throw e;
        }
        if (results.rowCount === 0) res.send("WRONG")
        else res.send(results.rows[0]);
    })
}
exports.authOrganizer = (req, res) => {
    console.log(req.params)
    const org = req.params;

    pool.query(`SELECT * FROM ORGANIZER WHERE email like '${org.email}' AND password like '${org.password}'`, (e, results) => {
        if (e) {
            throw e;
        }
        if (results.rowCount === 0) res.send("WRONG")
        else res.send(results.rows[0]);
    })
}

exports.getMessageRequests = (req, res) => {
    const values = [req.params.id];
    pool.query(`select fromid, toid, r.eventid, eb.username, eb.photo_link, dob, gender, first_name, last_name, address, occupation, e.name, e.photo_link as event_photo_link, e.location, e.type, e.theme, e.start_date, e.end_date, i.start_time, i.end_time from requests as r, eventbuddy as eb, event as e, interested as i where toid = $1 and e.id = r.eventid and eb.username = fromid and i.username = eb.username and r.eventid = e.id`, values, (e, results) => {
        if (e) {
            throw e;
        }
        else res.send(results.rows);
    })
}

exports.getMessageRecepients = (req, res) => {
    const user = req.params.id;
    pool.query(`select username, first_name, last_name, photo_link from eventbuddy where username = any(select fromid as recepient from messages where toid = '${user}' union
    select toid as recepient from messages where fromid = '${user}')`, (e, results) => {
        if (e) {
            throw e;
        }
        else res.send(results.rows);
    })
}
exports.getMessages = (req, res) => {
    const user = req.params.user;
    const resp = req.params.recepient;
    pool.query(`select * from messages where (fromid = '${user}' and toid = '${resp}') OR (fromid = '${resp}' and toid = '${user}') order by id`, (e, results) => {
        if (e) {
            throw e;
        }
        else res.send(results.rows);
    })
}

exports.pushMessage = (req, res) => {
    const body = req.body;
    const values = [body.from, body.to, body.message, "msg"];

    pool.query(`insert into messages(fromid, toid, message, type) values($1,$2,$3, $4)`, values, (e, results) => {
        if (e) {
            throw e;
        }

        index.messageSent('chat-room', body.to);
        res.send('sent!');
    })
}
exports.getBanners = (req, res) => {
    res.send(banners)
}
exports.getSuggestions = (req, res) => {
    const id = req.params.id;
    values = [id];
    pool.query(`select * from eventbuddy where username != $1 order by getpercentmatch($1, username) desc`, values, (e, results) => {
        if (e) {
            throw e;
        }
        else res.send(results.rows);
    })
}
exports.getActivites = (req, res) => {
    const id = req.params.id;
    values = [id];
    pool.query(`select * from activity where toid = $1 order by id desc`, values, (e, results) => {
        if (e) {
            throw e;
        }
        else res.send(results.rows);
    })
}

exports.getManagerEvents = (req, res) => {
    const manager = req.params.id;
    pool.query(`SELECT *, countInterested(id), countConfirmed(id) FROM EVENT WHERE organizer like '${manager}'`, (e, results) => {
        if (e) {
            throw e;
        }
        res.send(results.rows);
    })
}

exports.addEvent = (req, res) => {
    const user = req.params.id;
    const eve = req.body;
    console.log(req.body);
    console.log(user);
    pool.query(`INSERT INTO event(name, photo_link, location, type, theme, description, start_date, end_date, organizer) VALUES('${eve.name}', '${eve.photo_link}', '${eve.location}', '${eve.type}', '${eve.theme}', '${eve.description}', '${eve.start_date}', '${eve.end_date}', '${user}')`, (e, results) => {
        if (e) {
            throw e;
        }
        res.send("event added")
    })
}

exports.getBigBanner = (req, res) => {
    pool.query(`select * from offer where type = 'Big Banner' order by random() limit 1`, (e, results) => {
        if (e) {
            throw e;
        }
        res.send(results.rows)
    })
}

exports.getSmallBanner = (req, res) => {
    pool.query(`select *, geteventname(eventid) from offer where type = 'Small Banner' order by random() limit 2`, (e, results) => {
        if (e) {
            throw e;
        }
        res.send(results.rows)
    })
}

exports.updateEvent = (req, res) => {
    const user = req.params.idl
    const eve = req.body;
    const values = Object.values(eve);
    console.log(values);
    pool.query(`UPDATE EVENT SET name = $2, photo_link = $3, location = $4, type = $5, theme = $6, description = $7, start_date = $8, end_date = $9 WHERE id = $1`, values.splice(0, 9), (e, results) => {
        if (e) {
            throw e;
        }
        res.send("event update")
    })
}
exports.deleteEvent = (req, res) => {
    const eventId = req.params.eventId;
    console.log(eventId);
    pool.query(`DELETE FROM EVENT WHERE id = '${eventId}'`, (e, results) => {
        if (e) {
            throw e;
        }
        res.send("event deleted")
    })
}

exports.getManagerLogistics = (req, res) => {
    const managerId = req.params.id;
    pool.query(`    select * from logistic where eventid = any (select id from event where organizer = $1)`, [managerId], (e, results) => {
        if (e) {
            throw e;
        }
        res.send(results.rows)
    })
}

exports.addLogistic = (req, res) => {
    const data = req.body;
    const values = [data.title, data.purpose, data.type, data.amount, data.price, data.eventid]
    pool.query(`INSERT INTO logistic(title, purpose, type, amount, price, eventid) VALUES($1, $2, $3, $4, $5, $6)`, values, (e, results) => {
        if (e) {
            throw e;
        }
        res.send("logstic added")
    })
}

exports.getManagerPromos = (req, res) => {
    const managerId = req.params.id;
    pool.query(`select * from offer where eventid = any(select id from event where organizer = $1)`, [managerId], (e, results) => {
        if (e) {
            throw e;
        }
        else res.send(results.rows);
    })
}

exports.addOffer = (req, res) => {
    const data = req.body;
    console.log(data);
    if (data.type === "Small Banner") {
        const values = [data.type, data.eventid, data.title, data.subtitle, data.promo_end_date]
        pool.query(`INSERT INTO offer(eventid, type, title, subtitle, promo_end_date) VALUES($2, $1, $3, $4, $5)`, values, (e, results) => {
            if (e) {
                throw e;
            }
            res.send("offer added")
        })
    }
    else if (data.type === "Big Banner") {
        const values = [data.type, data.eventid, data.title, data.subtitle, data.promo_end_date, data.end_date, data.photo_link]
        pool.query(`INSERT INTO offer(eventid, type, title, subtitle, promo_end_date, end_date, photo_link) VALUES($2, $1, $3, $4, $5, $6, $7)`, values, (e, results) => {
            if (e) {
                throw e;
            }
            res.send("offer added")
        })
    }
    else {
        const values = [data.type, data.eventid, data.promo_end_date]
        pool.query(`INSERT INTO offer(eventid, type, promo_end_date) VALUES($2, $1, $3)`, values, (e, results) => {
            if (e) {
                throw e;
            }
            res.send("offer added")
        })
    }
}

exports.getLink = (req, res) => {
    const form = req.body.photo;
    const imgbbUploader = require("imgbb-uploader");
    console.log(form);
    const options = {
        apiKey: "f8dc2e55365fd6e12d7304b90d6f2671", // MANDATORY
        imageUrl: form, // OPTIONAL: pass an URL to imgBB (max 32Mb)
      
        // base64string:
        //   "iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAEklEQVR42mNcLVNbzwAEjDAGACcSA4kB6ARiAAAAAElFTkSuQmCC",
        // // OPTIONAL: pass base64-encoded image (max 32Mb)
      };
      console.log(options.apiKey)
    imgbbUploader(options)
        .then((response) => res.send(response))
}

exports.getMaxInterest = (req, res) => {
    const managerId = req.params.id;
    pool.query(`select name, countinterested(id) as count from event where countinterested(id) = any(select max(countinterested(id)) from event where organizer = $1) and organizer = $1`, [managerId], (e, results) => {
        if (e) {
            throw e;
        }
        res.send(results.rows)
    })
}
exports.getMaxConfirm = (req, res) => {
    const managerId = req.params.id;
    pool.query(`select name, countconfirmed(id) as count from event where countconfirmed(id) = any(select max(countconfirmed(id)) from event where organizer = $1) and organizer = $1`, [managerId], (e, results) => {
        if (e) {
            throw e;
        }
        res.send(results.rows)
    })
}
exports.getTotalInterest = (req, res) => {
    const managerId = req.params.id;
    pool.query(`select sum(countinterested(id)) as count from event where organizer = $1`, [managerId], (e, results) => {
        if (e) {
            throw e;
        }
        res.send(results.rows)
    })
}
exports.getTotalConfirm = (req, res) => {
    const managerId = req.params.id;
    pool.query(`select sum(countconfirmed(id)) as count from event where organizer = $1`, [managerId], (e, results) => {
        if (e) {
            throw e;
        }
        res.send(results.rows)
    })
}
exports.getMaxCost = (req, res) => {
    const managerId = req.params.id;
    pool.query(`select geteventname(eventid) as name, type, (price*amount) as count from logistic where price*amount = any(select max(price*amount) from logistic where eventid = any(select id from event where organizer = $1))`, [managerId], (e, results) => {
        if (e) {
            throw e;
        }
        res.send(results.rows)
    })
}
exports.getEndingSoon = (req, res) => {
    const managerId = req.params.id;
    pool.query(`select type, geteventname(eventid) as name, promo_end_date - current_date as end_date from offer where (select promo_end_date) = any(select min(promo_end_date) from offer where eventid = any(select id from event where organizer = $1) and promo_end_date > current_date)`, [managerId], (e, results) => {
        if (e) {
            throw e;
        }
        res.send(results.rows)
    })
}

exports.getTopEvent = (req, res) => {
    console.log('hi');

    pool.query(`SELECT * FROM EVENT WHERE ID = ANY(SELECT eventid FROM OFFER WHERE type = 'Event Top Result' AND PROMO_END_DATE > CURRENT_TIMESTAMP) order by random()`, [], (e, results) => {
        if (e) {
            throw e;
        }
        res.send(results.rows)
    })
}

exports.getFun = (req, res) => {
    res.send('hi')
}

exports.getEventBuddy = (req, res) => {
    const username = req.params.id;
    console.log(username)
    pool.query(`SELECT * FROM EVENTBUDDY WHERE username like $1`, [username], (e, results) => {
        if (e) {
            throw e;
        }
        if (results.rowCount === 0) res.send("WRONG")
        else res.send(results.rows[0]);
    })
}