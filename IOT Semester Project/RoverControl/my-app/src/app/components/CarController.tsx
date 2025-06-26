'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext'; // adjust if your path is different

const CarController = () => {
  const ws = useRef<WebSocket | null>(null);

  const [speed, setSpeed] = useState(70);
  const [angle, setAngle] = useState(85);

  const { user, loading, logout } = useAuth();
  const router = useRouter();

  // 🚫 Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push('/sign-in');
    }
  }, [user, loading, router]);

  // 🧠 Setup WebSocket
  useEffect(() => {
    if (!user) return;

    ws.current = new WebSocket(`ws://${window.location.hostname}:8765`);

    ws.current.onopen = () => {
      ws.current?.send(JSON.stringify({ type: 'speed', speed }));
      ws.current?.send(JSON.stringify({ type: 'servo', angle }));
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setSpeed(data.speed);
      setAngle(data.angle);
    };

    return () => {
      ws.current?.close();
    };
  }, [user]);

  // 🧭 Send Commands
  const sendCommand = useCallback((type: string, value: any) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ type, ...(typeof value === 'object' ? value : { value }) }));
    }
  }, []);

  // 🎹 Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!user) return;

      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', '+', '-', '='].includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case 'ArrowUp':
          sendCommand('move', { dir: 'forward' }); break;
        case 'ArrowDown':
          sendCommand('move', { dir: 'backward' }); break;
        case 'ArrowLeft':
          setAngle((prev) => {
            const newAngle = Math.min(115, prev + 5);
            sendCommand('servo', newAngle);
            return newAngle;
          });
          break;
        case 'ArrowRight':
          setAngle((prev) => {
            const newAngle = Math.max(45, prev - 5);
            sendCommand('servo', newAngle);
            return newAngle;
          });
          break;
        case '+':
        case '=':
          setSpeed((prev) => {
            const newSpeed = Math.min(100, prev + 10);
            sendCommand('speed', newSpeed);
            return newSpeed;
          });
          break;
        case '-':
          setSpeed((prev) => {
            const newSpeed = Math.max(0, prev - 10);
            sendCommand('speed', newSpeed);
            return newSpeed;
          });
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
        sendCommand('move', { dir: 'stop' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [user, sendCommand]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 via-sky-200 to-blue-300 flex flex-col items-center justify-center px-6">
      <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">🚗 Car Controller</h1>

      <p className="text-lg text-gray-700 mb-10 text-center">
        Use <span className="font-medium">Arrow Keys</span> to move.{" "}
        <br className="md:hidden" />
        Use <span className="font-medium">+ / -</span> to adjust speed.
      </p>

      <div className="grid grid-cols-2 gap-6 mb-10">
        <div className="bg-white/70 backdrop-blur-lg shadow-xl rounded-2xl p-6 text-center w-40">
          <p className="text-sm text-gray-600">Speed</p>
          <p className="text-2xl font-bold text-slate-800">{speed}%</p>
        </div>
        <div className="bg-white/70 backdrop-blur-lg shadow-xl rounded-2xl p-6 text-center w-40">
          <p className="text-sm text-gray-600">Servo Angle</p>
          <p className="text-2xl font-bold text-slate-800">{angle}°</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div></div>
        <button onClick={() => sendCommand('move', { dir: 'forward' })} className="btn">↑</button>
        <div></div>
        <button onClick={() => sendCommand('move', { dir: 'left' })} className="btn">←</button>
        <button onClick={() => sendCommand('move', { dir: 'stop' })} className="btn">■</button>
        <button onClick={() => sendCommand('move', { dir: 'right' })} className="btn">→</button>
        <div></div>
        <button onClick={() => sendCommand('move', { dir: 'backward' })} className="btn">↓</button>
        <div></div>
      </div>

      <button onClick={logout} className="mt-10 text-sm text-red-600 hover:underline">
        Sign Out
      </button>
    </main>
  );
};

export default CarController;
