import clientPromise from '../../../lib/mongodb';

/*
TODO:
- Convert this to TS
- what if the call fails? account for errros
*/

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const data = req.query;
    if (!data) {
      console.log('no query');
      res.status(400).json({ orgId: undefined });
    }
    const client = await clientPromise;
    const db = client.db();
    const yourCollection = db.collection('metaverseOrganizations');
    const organization = await yourCollection.findOne({
      organizationName: data.organization,
    });
    if (organization) {
      console.log('match found');
      res.status(201).json({
        orgId: organization.organizationId,
        orgName: organization.organizationName,
        orgDesc: organization.organizationDescription,
      });
    } else {
      console.log('no match found');
      res
        .status(201)
        .json({ orgId: undefined, orgName: undefined, orgDesc: undefined });
    }
  }
}
