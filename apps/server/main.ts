import Fastify from "fastify";
import cors from "@fastify/cors";
import { z } from 'zod';

const loginSchema = z.object({
  username: z.literal("bumblebee"),
  password: z.literal("IloveHon3y"),
});

const cartSchema = z.array(z.object({
  honeyType: z.enum(["akác", "gyógy", "hárs", "virág", "repce"]),
  quantity: z.number().int().positive(),
}));

const fastifyServer = Fastify();

fastifyServer.register(cors, {
  origin: "*",
  methods: "*",
});

fastifyServer.post("/api/login", async (request, reply) => {
  if (loginSchema.safeParse(request.body).success) {
    reply
      .code(200)
      .send({ authenticated: true });
    return;
  }
  
  reply.code(403).send({ error: "unauthorized" });
  return;
});

fastifyServer.post("/api/order", async (request, reply) => {
  const cart = cartSchema.safeParse(request.body);

  if (cart.success) {
    const toBeLogged = cart.data.reduce((acc, item) => {
      acc[item.honeyType] = item.quantity;
      return acc;
    }, {} as Record<string, number>);

    console.log(`Order successful: ${JSON.stringify(toBeLogged)}`);

    reply
      .code(200)
      .send({ status: "order successful" });
    return;
  }

  reply.code(400).send({ error: "bad_request" });
  return;
});

fastifyServer.listen({ port: 3001 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
