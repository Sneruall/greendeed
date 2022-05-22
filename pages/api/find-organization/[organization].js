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
      res.status(400).json({ orgId: undefined });
    }
    const client = await clientPromise;
    const db = client.db();
    const yourCollection = db.collection('metaverseOrganizations');
    const organization = await yourCollection.findOne({
      organizationName: data.organization,
    });
    if (organization) {
      res.status(201).json({
        orgId: organization.organizationId,
        orgName: organization.organizationName,
      });
    } else {
      res.status(201).json({ orgId: undefined, orgName: undefined });
    }
  }
}
