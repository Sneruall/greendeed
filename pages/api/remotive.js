import clientPromise from '../../lib/mongodb';

// Send POST request to /api/remotive to add a remotive job selection from the database,
// attach the id and sdg to the request body.

/*
TODO:
- Convert this to TS
- Add validation of incoming body
- Add Server Side validation (now only client side)
- Add authentication

*/

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    data.timestamp = new Date().getTime();
    const client = await clientPromise;
    const db = client.db();
    const yourCollection = db.collection(
      process.env.MONGODB_REMOTIVE_COLLECTION
    );
    const result = await yourCollection.insertOne(data);
    console.log(result);
    res.status(201).json({
      message: 'Data inserted successfully in Company DB!',
      data: data,
    });
  }
}

// [
//     {
//        "id":"1294241",
//        "sdg":[
//           1,
//           2,
//           3
//        ]
//     },
//     {
//        "id":"1275809",
//        "sdg":[
//           1,
//           2,
//           3
//        ]
//     }
//  ]
