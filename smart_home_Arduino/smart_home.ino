#include <Wire.h> 
#include <LiquidCrystal_I2C.h>
#include <ESP8266WiFi.h>
#include <ESPAsyncWebServer.h>
#include <Servo.h>

LiquidCrystal_I2C lcd(0x27, 16, 2);
const char *ssid = "Shamu_2G";
const char *password = "15010909";
Servo myservo;

void abrePorta(){
  int val = myservo.read();
    Serial.println(val);
    if(val != 180)
      myservo.write(180);
}

void fechaPorta(){
  int val = myservo.read();
  Serial.println(val);
    if(val)
      myservo.write(0);
}

int temp_atual = 19;
void Inicializa_AC(){
    lcd.clear();
    lcd.setCursor(3, 0);
    lcd.print("Atualizando");
    lcd.setCursor(3, 1);
    lcd.print("Temperatura");
    //delay(3000);
    lcd.clear();
    lcd.print("temperatura: ");
    lcd.print(temp_atual);
  
}
void mudaTemp(int temp, int status_AC) {
  if(status_AC){
  if(temp != temp_atual){
    temp_atual = temp;
    lcd.clear();
    lcd.setCursor(3, 0);
    lcd.print("Atualizando");
    lcd.setCursor(3, 1);
    lcd.print("Temperatura");
    //delay(3000);
    lcd.clear();
    lcd.print("temperatura: ");
    lcd.print(temp_atual);
  } 
  }else{
    lcd.clear();
  }
}
void acendeLuz(int id_luz){
  if(id_luz==1)
    digitalWrite(13, HIGH); // Acende o Led
   else
    digitalWrite(12, HIGH); // Acende o Led
}
void apagaLuz(int id_luz){  
  if(id_luz==1)
    digitalWrite(13, LOW); // Apaga o Led
   else
    digitalWrite(12, LOW); // Apaga o Led
}
//====================================================================

AsyncWebServer server(80);
AsyncWebSocket ws("/ws");


void handleWebSocketReceivedMessage(void *arg, uint8_t *data, size_t len) {
    auto *info = (AwsFrameInfo *) arg;

    if (info->final && info->index == 0 && info->len == len && info->opcode == WS_TEXT) {
        data[len] = 0;

        String str = String((char *) data);
        Serial.println("Message received: " + str);

        if (str.equals("__RESET__")) ESP.restart();

//        if (doorAlertSent || passwordAlertSent) {
//            if (is_strange_activity(str)) 
//              ringBuzzer();
//            else 
//              turnBuzzerOff();   // just to reset alarm flags
//        } else if (buzzerRinging && should_turn_off_alarm(str)) {
//            turnBuzzerOff();
//            ws.textAll("Alarme interrompido");
//        } else {
//            ws.textAll("Ok");
//        }
    }
}

void onEvent(AsyncWebSocket *aws, AsyncWebSocketClient *client, AwsEventType type, void *arg, uint8_t *data, size_t len) {
    switch (type) {
        case WS_EVT_CONNECT:
            Serial.printf("WebSocket client #%u connected from %s\n", client->id(), client->remoteIP().toString().c_str());
            break;
        case WS_EVT_DISCONNECT:
            Serial.printf("WebSocket client #%u disconnected\n", client->id());
            break;
        case WS_EVT_DATA:
            handleWebSocketReceivedMessage(arg, data, len);
            break;
        case WS_EVT_PONG:
        case WS_EVT_ERROR:
            break;
    }
}

void initWebSocket() {
    ws.onEvent(onEvent);
    server.addHandler(&ws);
}

void configureNetwork() {
    // Connect to Wi-Fi
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.println("Connecting to WiFi..");
    }

    // Print ESP Local IP Address
    Serial.println(WiFi.localIP());

    initWebSocket();

    // Route for root / web page
    server.on("/", HTTP_GET, [](AsyncWebServerRequest *request) {
        request->send_P(200, "text/html", "OK");
    });
    server.on("/luz", HTTP_GET, [](AsyncWebServerRequest *request) {
        
        int status_luz = request->arg("status").toInt();
        int id_luz = request->arg("id").toInt();
        Serial.println("status luz "); 
        Serial.println(String(status_luz));
        Serial.println("id luz "); 
        Serial.println(String(id_luz));
        if(!status_luz){
          acendeLuz(id_luz);
          Serial.println("acendendo luz ");  
        }else{
          apagaLuz(id_luz);
          Serial.println("Desliga Luz");
        }
        
        
        request->send_P(200, "text/html", "OK");
    });
    server.on("/AC", HTTP_GET, [](AsyncWebServerRequest *request) {
        
        int temperatura = request->arg("temperatura").toInt();
        int status_AC = request->arg("status").toInt();
        
        Serial.println("Temp AC "); 
        Serial.println(String(temperatura));
        Serial.println("status AC "); 
        Serial.println(String(status_AC));
        mudaTemp(temperatura,status_AC);
        request->send_P(200, "text/html", "OK");
    });

        server.on("/tranca", HTTP_GET, [](AsyncWebServerRequest *request) {
        
        int status_tranca = request->arg("status").toInt();
        
        Serial.println("status tranca "); 
        Serial.println(String(status_tranca));
        if(status_tranca == 1)
          abrePorta();
        else
          fechaPorta();
        request->send_P(200, "text/html", "OK");
    });
//    server.on("/iluminacao/2", HTTP_GET, [](AsyncWebServerRequest *request) {
//      request->
//        request->send_P(200, "text/html", "teste");
//    });
//    server.on("ar", HTTP_GET, [](AsyncWebServerRequest *request) {
//      request->
//        request->send_P(200, "text/html", "teste");
//    });

    // Start server
    server.begin();
}




//void configureDevices() {
//    pinMode(BUZZER_PIN, OUTPUT);
//    pinMode(TRIGGER_PIN, OUTPUT);
//    pinMode(ECHO_PIN, INPUT);
//
//    pinMode(BUTTON1_PIN, INPUT_PULLUP);
//    pinMode(BUTTON2_PIN, INPUT_PULLUP);
//    pinMode(BUTTON3_PIN, INPUT_PULLUP);
//    pinMode(BUTTON4_PIN, INPUT_PULLUP);
//    pinMode(BUTTON5_PIN, INPUT_PULLUP);
//    pinMode(BUTTON6_PIN, INPUT_PULLUP);
//}












//===============================================================
void setup()
{
  Serial.begin(115200);

    configureNetwork();
    //configureDevices();
  lcd.init();
  lcd.backlight();
  lcd.setCursor(5,0);
  lcd.print("");
  lcd.setCursor(3,1);
  lcd.print("");
  pinMode(13, OUTPUT);
  pinMode(12, OUTPUT);
  pinMode(A0, INPUT);
  Inicializa_AC();
  myservo.attach(15);
  myservo.write(0);
}

void loop() {
  ws.cleanupClients();
  
  delay(3000);
}
