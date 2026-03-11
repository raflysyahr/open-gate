package expo.modules.mqttbroker

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import io.moquette.broker.Server
import io.moquette.broker.config.MemoryConfig
import java.util.Properties
import expo.modules.mqttbroker.MessageInterceptor

class MqttBrokerModule : Module() {

  private var mqttBroker: Server? = null
  private var started = false

  override fun definition() = ModuleDefinition {

    Name("MqttBroker")

    Events(
      "onBrokerStarted",
      "onBrokerStopped",
      "onMessageReceived"
    )

    // =========================
    // START BROKER
    // =========================
    Function("startBroker") {

      if (started) {
        return@Function
      }

      mqttBroker = Server()

      val props = Properties().apply {
        put("port", "1883")
        put("host", "0.0.0.0")
      }

      val interceptor = MessageInterceptor { topic, payload ->
      sendEvent(
        "onMessageReceived",
        mapOf(
          "topic" to topic,
           "payload" to payload
        )
       )
      }

    mqttBroker!!.startServer(MemoryConfig(props))

    mqttBroker!!.addInterceptHandler(interceptor)



    
 //     mqttBroker!!.startServer(MemoryConfig(props))
      started = true

      sendEvent("onBrokerStarted", emptyMap<String, Any>())
    }

    // =========================
    // STOP BROKER
    // =========================
    Function("stopBroker") {

      mqttBroker?.stopServer()
      mqttBroker = null
      started = false

      sendEvent("onBrokerStopped", emptyMap<String, Any>())
    }
  }

  // Cleanup when module destroyed
  override fun onDestroy() {
    mqttBroker?.stopServer()
    mqttBroker = null
    started = false
  }
}
