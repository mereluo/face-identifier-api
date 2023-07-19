import { ClarifaiStub, grpc } from "clarifai-nodejs-grpc";
const stub = ClarifaiStub.grpc();
const { PAT, USER_ID, APP_ID, MODEL_ID } = {
    PAT: process.env.PAT,
    USER_ID: process.env.USER_ID,
    APP_ID: process.env.APP_ID,
    MODEL_ID: process.env.MODEL_ID,
};

const metadata = new grpc.Metadata();
metadata.set("authorization", "Key " + PAT);

export function handleAPI(req, res) {
    stub.PostModelOutputs(
        {
            user_app_id: {
                user_id: USER_ID,
                app_id: APP_ID,
            },
            model_id: MODEL_ID,
            inputs: [{ data: { image: { url: req.body.input, allow_duplicate_url: true } } }],
        },
        metadata,
        (err, response) => {
            if (err) {
                console.log("Error: " + err);
                return;
            }
            if (response.status.code !== 10000) {
                console.log("Received failed status: " + response.status.description + "\n" + response.status.details);
                return;
            }
            res.json(response);
        }
    );
}

export function handleImage(req, res, db) {
    const { id } = req.body;
    db("users")
        .where("id", "=", id)
        .increment("entries", 1)
        .returning("entries")
        .then((entries) => {
            res.json(entries[0].entries);
        })
        .catch((err) => res.status(400).json("unable to get entries"));
}
