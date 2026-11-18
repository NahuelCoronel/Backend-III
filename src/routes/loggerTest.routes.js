import { Router } from "express";

const router = Router();

router.get("/loggerTest", (req, res) => {
  req.logger.debug("Mensaje de nivel DEBUG - Prueba de diagnóstico");
  req.logger.http("Mensaje de nivel HTTP - Registro de petición");
  req.logger.info("Mensaje de nivel INFO - Operación estándar");
  req.logger.warning("Mensaje de nivel WARNING - Advertencia del sistema");
  req.logger.error("Mensaje de nivel ERROR - Fallo controlado");
  req.logger.fatal("Mensaje de nivel FATAL - Error crítico del sistema");

  res.send({ status: "success", message: "Logs probados con éxito" });
});

export default router;
