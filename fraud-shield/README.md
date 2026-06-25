# Fraud Shield

Minimum accessible prototype for detecting fraud language during calls from unknown numbers.

## Run

```bash
python3 -m http.server 4173 --directory fraud-shield
```

Open `http://localhost:4173` and select **Try a sample call**. The demo detects an OTP request after a few seconds. In supported browsers it also attempts live speech recognition.

## Important platform limit

This web prototype cannot access audio from a real cellular call. A production build needs native telephony integration. Android tightly restricts call-audio capture; iOS does not expose ordinary cellular call audio to third-party apps. The practical production paths are an OEM/default-dialer Android integration, carrier/VoIP integration, or processing calls routed through an app-owned VoIP service.

Audio is processed in the browser and is not stored by this prototype.
