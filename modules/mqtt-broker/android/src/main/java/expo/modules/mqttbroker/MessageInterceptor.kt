package expo.modules.mqttbroker


import io.moquette.interception.AbstractInterceptHandler
import io.moquette.interception.messages.InterceptPublishMessage

class MessageInterceptor(
  private val emit: (String, String) -> Unit
) : AbstractInterceptHandler() {

  override fun onPublish(msg: InterceptPublishMessage) {
   
        val topic = msg.topicName

        val bytes = ByteArray(msg.payload.readableBytes())
        msg.payload.getBytes(0, bytes)

        val payload = String(bytes)

        emit(topic, payload)  

   
  }

  override fun getID(): String = "expo-interceptor"
}
