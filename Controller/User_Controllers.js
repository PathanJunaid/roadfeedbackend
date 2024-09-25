import { form_data_connect } from "../Mongodb/Schema.js";

export const feedbackformsearch = async (req, res) => {
    const { Search, Type } = req.body;

    let Response = {
        status: "success",
        code: 200,
        data: []
    };

    try {
        // Use await to fetch data from the database
        var data;
        if(Type === "Number"){
            data = await form_data_connect.find({ Number: Search });
        }else{
            data = await form_data_connect.find({ Email: Search });
        }
        // If data is found, set it in the Response object
        Response.data = [...data];

        // If no data found, modify the status code but still send the empty array
        if (data.length === 0) {
            Response.status = "no data found";
            Response.code = 204; // 204: No Content
        }

    } catch (error) {
        // If an error occurs during the database query, handle the failure case
        Response = {
            status: "failed",
            code: 500, // 500: Internal Server Error
            data: [],
            error: error.message // Add the error message for debugging
        };
    }

    // Send the final response
    res.send(Response);


}