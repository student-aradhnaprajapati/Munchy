import request from "supertest";
import express from "express";
import { createOrder } from "../controllers/orderController.js";

const app = express();
app.use(express.json());
app.post("/order", createOrder);

describe("POST /order", () => {
  it("should return 400 if fields are missing", async () => {
    const res = await request(app).post("/order").send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Missing fields");
  });

  it("should return 201 if valid", async () => {
    const res = await request(app).post("/order").send({
      user_id: 1,
      provider_id: 2,
      items: [{ name: "Paneer", qty: 1 }],
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Order created successfully");
  });
});
