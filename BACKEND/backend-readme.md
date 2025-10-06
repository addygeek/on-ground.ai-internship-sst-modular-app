# STT Vosk - Wake/Sleep Voice Listener

Small backend component that uses Vosk + sounddevice to run continuous speech-to-text with simple wake / sleep word control. Designed to run on Windows with a microphone.

## Features
- Continuous microphone streaming
- Detects "wake" words to start buffering transcripts
- Detects "sleep" words to stop buffering
- Uses Vosk offline ASR (no cloud required)
- Lightweight transcript buffer with retrieval API

## Files
- BACKEND/stt_vosk.py — main listener class `WakeSleepVosk`.

## Prerequisites
- Windows 10/11
- Python 3.9+
- A working microphone
- Visual C++ Build Tools (for some native wheels)

## Dependencies
Install required packages:

PowerShell:
```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install --upgrade pip
pip install vosk sounddevice numpy

