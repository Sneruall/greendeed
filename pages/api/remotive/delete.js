import clientPromise from '../../../lib/mongodb';

/*
TODO:
- Convert this to TS
- Add validation of incoming body
- Add Server Side validation (now only client side)

*/

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { id } = req.query;
    const client = await clientPromise;
    const db = client.db();
    const yourCollection = db.collection(
      process.env.MONGODB_REMOTIVE_COLLECTION
    );
    const result = await yourCollection.deleteOne({ id: id });
    console.log(result);
    res.status(204).end();
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
