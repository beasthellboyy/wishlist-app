import { json } from "@remix-run/node";

export async function loader() {

    return json({ 
        ok: true,
        message: "Wishlist API is working!",
     });

}

export async function action({ request }) {
    const method = request.method;

    switch (method) {
        case "GET":
            return json({ 
                ok: true,
                message: "Wishlist API is GETTING!",
             });
        case "POST":
            return json({ 
                ok: true,
                message: "Wishlist API is POSTING!",
             });
        case "PATCH":
            return json({ 
                ok: true,
                message: "Wishlist API is PATCHING!",
             });
        case "DELETE":
            return json({ 
                ok: true,
                message: "Wishlist API is DELETING!",
             });
        default:
            return new Response("Method not allowed", { status: 405 });
  }
}