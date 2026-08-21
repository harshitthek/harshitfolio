import { useEffect, useRef } from 'react';

export default function NeuralSynapseWing({ isActive }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    const width = 195;
    const height = 150;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    // Neural Network Architecture: 3 Layers [3, 4, 3] nodes
    const layers = [
      // Layer 1 (Input)
      [
        { x: 30, y: 35, baseR: 4 },
        { x: 30, y: 75, baseR: 4 },
        { x: 30, y: 115, baseR: 4 }
      ],
      // Layer 2 (Hidden)
      [
        { x: 97, y: 25, baseR: 4.5 },
        { x: 97, y: 58, baseR: 4.5 },
        { x: 97, y: 92, baseR: 4.5 },
        { x: 97, y: 125, baseR: 4.5 }
      ],
      // Layer 3 (Output)
      [
        { x: 165, y: 35, baseR: 4 },
        { x: 165, y: 75, baseR: 4 },
        { x: 165, y: 115, baseR: 4 }
      ]
    ];

    // Create Axon Synaptic Connections between adjacent layers
    const connections = [];
    for (let l = 0; l < layers.length - 1; l++) {
      const fromLayer = layers[l];
      const toLayer = layers[l + 1];
      fromLayer.forEach((fromNode) => {
        toLayer.forEach((toNode) => {
          connections.push({
            from: fromNode,
            to: toNode,
            activity: Math.random()
          });
        });
      });
    }

    // Moving Signal Packets (Photons) along axons
    const packets = Array.from({ length: 14 }, () => {
      const conn = connections[Math.floor(Math.random() * connections.length)];
      return {
        conn,
        progress: Math.random(),
        speed: 0.008 + Math.random() * 0.012,
        color: Math.random() > 0.4 ? '#00ff88' : '#38bdf8'
      };
    });

    const mouse = { x: -100, y: -100 };
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.04;

      // 1. Draw Synaptic Axon Connections
      connections.forEach((conn) => {
        const dx = conn.to.x - conn.from.x;
        const _dy = conn.to.y - conn.from.y;
        const cp1x = conn.from.x + dx * 0.5;
        const cp1y = conn.from.y;
        const cp2x = conn.from.x + dx * 0.5;
        const cp2y = conn.to.y;

        ctx.strokeStyle = 'rgba(56, 189, 248, 0.16)';
        ctx.lineWidth = 0.9;
        ctx.beginPath();
        ctx.moveTo(conn.from.x, conn.from.y);
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, conn.to.x, conn.to.y);
        ctx.stroke();
      });

      // 2. Update & Draw Data Signal Packets
      packets.forEach((p) => {
        p.progress += p.speed;
        if (p.progress >= 1) {
          p.progress = 0;
          p.conn = connections[Math.floor(Math.random() * connections.length)];
        }

        const t = p.progress;
        const f = p.conn.from;
        const to = p.conn.to;
        const dx = to.x - f.x;
        const cp1x = f.x + dx * 0.5;
        const cp1y = f.y;
        const cp2x = f.x + dx * 0.5;
        const cp2y = to.y;

        // Cubic Bezier interpolation
        const u = 1 - t;
        const px = u * u * u * f.x + 3 * u * u * t * cp1x + 3 * u * t * t * cp2x + t * t * t * to.x;
        const py = u * u * u * f.y + 3 * u * u * t * cp1y + 3 * u * t * t * cp2y + t * t * t * to.y;

        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(px, py, 1.8, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.shadowBlur = 0;

      // 3. Draw Synaptic Neuron Nodes
      layers.forEach((layer, lIdx) => {
        layer.forEach((node, nIdx) => {
          const dist = Math.hypot(node.x - mouse.x, node.y - mouse.y);
          const isHovered = dist < 24;
          const pulse = Math.sin(time * 2 + lIdx * 1.5 + nIdx) * 0.8;
          const r = node.baseR + pulse + (isHovered ? 2.5 : 0);

          // Outer Glow Ring
          ctx.strokeStyle = lIdx === 1 ? 'rgba(0, 255, 136, 0.4)' : 'rgba(56, 189, 248, 0.4)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(node.x, node.y, r + 2.5, 0, Math.PI * 2);
          ctx.stroke();

          // Node Core
          ctx.fillStyle = isHovered ? '#ffffff' : lIdx === 1 ? '#00ff88' : '#38bdf8';
          ctx.shadowColor = lIdx === 1 ? '#00ff88' : '#38bdf8';
          ctx.shadowBlur = isHovered ? 12 : 6;
          ctx.beginPath();
          ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
          ctx.fill();
        });
      });
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isActive]);

  return (
    <aside className="cyber-flank-synapse right-flank" aria-hidden="true">
      <div className="synapse-window">
        <span className="corner tl"></span>
        <span className="corner tr"></span>
        <span className="corner bl"></span>
        <span className="corner br"></span>

        <div className="synapse-header">
          <div className="synapse-title-left">
            <span className="synapse-pulse-dot"></span>
            <span className="synapse-title">SYNAPSE MATRIX {/* v2.4 */}</span>
          </div>
          <span className="synapse-badge">LIVE</span>
        </div>

        <canvas ref={canvasRef} className="synapse-canvas" />

        <div className="synapse-footer">
          <span className="synapse-stat cyan">NODES: 10</span>
          <span className="synapse-stat green">AXONS: 24</span>
          <span className="synapse-stat">FLUX: OPTIMAL</span>
        </div>
      </div>
    </aside>
  );
}
