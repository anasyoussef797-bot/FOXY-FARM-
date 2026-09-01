import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FarmPlot, CropType } from '../types';
import { CROPS_DATA } from '../data/initialData';
import { Maximize2, RotateCcw, Sparkles, Sun, Droplets } from 'lucide-react';

interface FarmCanvas3DProps {
  plots: FarmPlot[];
  onPlotClick: (plot: FarmPlot) => void;
  onHarvest: (plotId: number) => void;
  onWater: (plotId: number) => void;
}

export const FarmCanvas3D: React.FC<FarmCanvas3DProps> = ({
  plots,
  onPlotClick,
  onHarvest,
  onWater,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedPlot, setSelectedPlot] = useState<FarmPlot | null>(null);
  const [cameraMode, setCameraMode] = useState<'isometric' | 'perspective'>('isometric');

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 450;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a);
    scene.fog = new THREE.FogExp2(0x0f172a, 0.025);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(16, 18, 20);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xfff5e6, 0.9);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfffaed, 1.8);
    sunLight.position.set(20, 30, 15);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 80;
    sunLight.shadow.camera.left = -20;
    sunLight.shadow.camera.right = 20;
    sunLight.shadow.camera.top = 20;
    sunLight.shadow.camera.bottom = -20;
    scene.add(sunLight);

    // Hemispheric blue sky / green bounce
    const hemiLight = new THREE.HemisphereLight(0x87ceeb, 0x2e7d32, 0.6);
    scene.add(hemiLight);

    // Ground Grass Platform
    const groundGeo = new THREE.BoxGeometry(26, 0.8, 22);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x1e3a1e,
      roughness: 0.8,
      metalness: 0.1,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.y = -0.4;
    ground.receiveShadow = true;
    scene.add(ground);

    // Water Canal along the side
    const canalGeo = new THREE.BoxGeometry(26, 0.6, 3);
    const canalMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      roughness: 0.1,
      metalness: 0.3,
      transparent: true,
      opacity: 0.85,
    });
    const canal = new THREE.Mesh(canalGeo, canalMat);
    canal.position.set(0, -0.3, -9.5);
    scene.add(canal);

    // Canal Stone Borders
    const borderGeo = new THREE.BoxGeometry(26, 0.3, 0.4);
    const borderMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.9 });
    const border1 = new THREE.Mesh(borderGeo, borderMat);
    border1.position.set(0, 0.1, -8);
    const border2 = new THREE.Mesh(borderGeo, borderMat);
    border2.position.set(0, 0.1, -11);
    scene.add(border1, border2);

    // Farm Plots Grid
    const plotMeshes: { mesh: THREE.Mesh; plotId: number }[] = [];
    const loader = new GLTFLoader();

    // 8 plots arranged in 2 rows of 4
    plots.forEach((plot, index) => {
      const row = Math.floor(index / 4);
      const col = index % 4;
      const x = (col - 1.5) * 4.5;
      const z = (row - 0.5) * 5 + 1.5;

      const plotGroup = new THREE.Group();
      plotGroup.position.set(x, 0, z);

      // Soil Box
      const soilGeo = new THREE.BoxGeometry(3.6, 0.35, 3.6);
      const soilColor = !plot.unlocked
        ? 0x334155
        : plot.isWatered
        ? 0x3f2212
        : 0x855335;
      const soilMat = new THREE.MeshStandardMaterial({
        color: soilColor,
        roughness: 0.9,
      });
      const soilMesh = new THREE.Mesh(soilGeo, soilMat);
      soilMesh.position.y = 0.18;
      soilMesh.castShadow = true;
      soilMesh.receiveShadow = true;
      soilMesh.userData = { plotId: plot.id };
      plotGroup.add(soilMesh);
      plotMeshes.push({ mesh: soilMesh, plotId: plot.id });

      // Border frame for plot
      const edgeGeo = new THREE.BoxGeometry(3.8, 0.2, 0.2);
      const edgeMat = new THREE.MeshStandardMaterial({ color: 0x5c4033, roughness: 0.8 });
      const e1 = new THREE.Mesh(edgeGeo, edgeMat);
      e1.position.set(0, 0.25, 1.8);
      const e2 = new THREE.Mesh(edgeGeo, edgeMat);
      e2.position.set(0, 0.25, -1.8);
      const edgeGeoZ = new THREE.BoxGeometry(0.2, 0.2, 3.8);
      const e3 = new THREE.Mesh(edgeGeoZ, edgeMat);
      e3.position.set(1.8, 0.25, 0);
      const e4 = new THREE.Mesh(edgeGeoZ, edgeMat);
      e4.position.set(-1.8, 0.25, 0);
      plotGroup.add(e1, e2, e3, e4);

      // If locked, show locked sign
      if (!plot.unlocked) {
        const signPost = new THREE.Mesh(
          new THREE.CylinderGeometry(0.08, 0.08, 1.2),
          new THREE.MeshStandardMaterial({ color: 0x78350f })
        );
        signPost.position.set(0, 0.7, 0);
        const signBoard = new THREE.Mesh(
          new THREE.BoxGeometry(1.4, 0.8, 0.1),
          new THREE.MeshStandardMaterial({ color: 0xb45309 })
        );
        signBoard.position.set(0, 1.1, 0);
        plotGroup.add(signPost, signBoard);
      } else if (plot.crop) {
        // Crop rendering: Plant models or procedural stylized plants
        const cropDef = CROPS_DATA[plot.crop];
        const scale = Math.max(0.2, (plot.growthProgress / 100) * 1.0);

        const cropGroup = new THREE.Group();
        cropGroup.position.set(0, 0.35, 0);

        // Procedural vibrant representation with leaf sprouts + fruit
        const stemGeo = new THREE.CylinderGeometry(0.08, 0.1, 0.8 * scale, 8);
        const stemMat = new THREE.MeshStandardMaterial({ color: 0x22c55e });
        const stem = new THREE.Mesh(stemGeo, stemMat);
        stem.position.y = 0.4 * scale;
        cropGroup.add(stem);

        // Leaves
        for (let i = 0; i < 3; i++) {
          const leafGeo = new THREE.ConeGeometry(0.25 * scale, 0.6 * scale, 5);
          const leafMat = new THREE.MeshStandardMaterial({ color: 0x16a34a });
          const leaf = new THREE.Mesh(leafGeo, leafMat);
          leaf.position.set(
            Math.cos((i * 2 * Math.PI) / 3) * 0.2 * scale,
            0.6 * scale,
            Math.sin((i * 2 * Math.PI) / 3) * 0.2 * scale
          );
          leaf.rotation.z = 0.4;
          leaf.rotation.y = (i * 2 * Math.PI) / 3;
          cropGroup.add(leaf);
        }

        // Produce / Harvest head
        if (plot.growthProgress >= 40) {
          const produceColor = new THREE.Color(cropDef.color);
          const produceGeo =
            plot.crop === 'pumpkin' || plot.crop === 'melon'
              ? new THREE.SphereGeometry(0.45 * scale, 12, 12)
              : plot.crop === 'carrot'
              ? new THREE.ConeGeometry(0.25 * scale, 0.8 * scale, 8)
              : new THREE.DodecahedronGeometry(0.35 * scale);
          const produceMat = new THREE.MeshStandardMaterial({
            color: produceColor,
            roughness: 0.4,
          });
          const produceMesh = new THREE.Mesh(produceGeo, produceMat);
          produceMesh.position.y = (plot.crop === 'carrot' ? 0.3 : 0.7) * scale;
          if (plot.crop === 'carrot') produceMesh.rotation.x = Math.PI;
          cropGroup.add(produceMesh);

          // Golden glow if ready to harvest
          if (plot.isReadyToHarvest) {
            const glowGeo = new THREE.RingGeometry(0.6, 0.8, 16);
            const glowMat = new THREE.MeshBasicMaterial({
              color: 0xfacc15,
              side: THREE.DoubleSide,
            });
            const glow = new THREE.Mesh(glowGeo, glowMat);
            glow.rotation.x = -Math.PI / 2;
            glow.position.y = 0.05;
            cropGroup.add(glow);
          }
        }

        plotGroup.add(cropGroup);
      }

      scene.add(plotGroup);
    });

    // Decorative 3D Elements around Farm: Windmill, Trees, Fences
    // Decorative Trees
    const treePositions = [
      { x: -11, z: -5 },
      { x: 11, z: -5 },
      { x: -11, z: 4 },
      { x: 11, z: 4 },
    ];
    treePositions.forEach((pos) => {
      const tree = new THREE.Group();
      tree.position.set(pos.x, 0, pos.z);
      const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.3, 0.4, 2),
        new THREE.MeshStandardMaterial({ color: 0x5c4033, roughness: 0.9 })
      );
      trunk.position.y = 1;
      trunk.castShadow = true;
      const foliage1 = new THREE.Mesh(
        new THREE.DodecahedronGeometry(1.3),
        new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.8 })
      );
      foliage1.position.y = 2.4;
      foliage1.castShadow = true;
      const foliage2 = new THREE.Mesh(
        new THREE.DodecahedronGeometry(1.0),
        new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.8 })
      );
      foliage2.position.y = 3.2;
      foliage2.castShadow = true;
      tree.add(trunk, foliage1, foliage2);
      scene.add(tree);
    });

    // Solar Panel Tech Element
    const solarGroup = new THREE.Group();
    solarGroup.position.set(-8, 0, -8);
    const post = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.1, 1.8),
      new THREE.MeshStandardMaterial({ color: 0x94a3b8 })
    );
    post.position.y = 0.9;
    const panel = new THREE.Mesh(
      new THREE.BoxGeometry(2.2, 0.1, 1.4),
      new THREE.MeshStandardMaterial({ color: 0x1e40af, metalness: 0.8, roughness: 0.2 })
    );
    panel.position.set(0, 1.8, 0);
    panel.rotation.x = -0.4;
    solarGroup.add(post, panel);
    scene.add(solarGroup);

    // Try loading actual nature/food GLB models if available in /nature
    try {
      loader.load('/nature/statue_column.glb', (gltf) => {
        gltf.scene.scale.set(0.8, 0.8, 0.8);
        gltf.scene.position.set(9, 0, -8);
        scene.add(gltf.scene);
      }, undefined, () => {});
    } catch {
      // Graceful fallback
    }

    // Raycasting for clicking on plots
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(
        plotMeshes.map((p) => p.mesh),
        false
      );

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const targetPlotId = hit.userData.plotId;
        const targetPlot = plots.find((p) => p.id === targetPlotId);
        if (targetPlot) {
          setSelectedPlot(targetPlot);
          onPlotClick(targetPlot);
        }
      }
    };

    renderer.domElement.addEventListener('click', handleClick);

    // Animation loop (slow gentle rotation & floating animation)
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Subtle water wave shine
      canalMat.opacity = 0.8 + Math.sin(elapsed * 2) * 0.08;

      // Gentle camera sway
      if (cameraMode === 'perspective') {
        camera.position.x = 16 + Math.sin(elapsed * 0.2) * 1.5;
        camera.position.z = 20 + Math.cos(elapsed * 0.2) * 1.5;
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
    };
    animate();

    // Resize observer
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 450;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, [plots, cameraMode]);

  return (
    <div id="farm-3d-viewport-card" className="relative w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
      {/* 3D Canvas Container */}
      <div ref={containerRef} className="w-full h-[400px] sm:h-[460px] cursor-pointer" />

      {/* Top Overlay Badge */}
      <div className="absolute top-4 left-4 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-700/60 shadow-lg text-xs font-semibold text-emerald-400">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        Live 3D Ecosystem Farm View
      </div>

      {/* Controls Overlay */}
      <div className="absolute top-4 right-4 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md p-1.5 rounded-xl border border-slate-700/60">
        <button
          id="btn-cam-isometric"
          onClick={() => setCameraMode(cameraMode === 'isometric' ? 'perspective' : 'isometric')}
          className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors text-xs flex items-center gap-1.5"
          title="Toggle Camera Orbit"
        >
          <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">{cameraMode === 'isometric' ? 'Orbit View' : 'Locked View'}</span>
        </button>
      </div>

      {/* Selected Plot Quick Banner */}
      {selectedPlot && (
        <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-slate-700 flex flex-wrap items-center justify-between gap-3 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-2xl border border-slate-700">
              {selectedPlot.crop ? CROPS_DATA[selectedPlot.crop].iconEmoji : '🌱'}
            </div>
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                Plot #{selectedPlot.id}
                <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-emerald-950 text-emerald-300 border border-emerald-800">
                  {selectedPlot.crop ? CROPS_DATA[selectedPlot.crop].name : selectedPlot.unlocked ? 'Empty Soil' : 'Locked Plot'}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {selectedPlot.crop
                  ? `${Math.round(selectedPlot.growthProgress)}% grown • ${selectedPlot.isWatered ? '💧 Hydrated' : '⚠️ Needs Water'}`
                  : selectedPlot.unlocked
                  ? 'Ready to plant seeds from your inventory'
                  : `Unlock for ${selectedPlot.unlockCost} coins`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {selectedPlot.crop && !selectedPlot.isWatered && (
              <button
                id="quick-btn-water-3d"
                onClick={() => onWater(selectedPlot.id)}
                className="px-3 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-md shadow-cyan-600/30"
              >
                <Droplets className="w-3.5 h-3.5" />
                Water Plot
              </button>
            )}
            {selectedPlot.isReadyToHarvest && (
              <button
                id="quick-btn-harvest-3d"
                onClick={() => onHarvest(selectedPlot.id)}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-orange-500/30 transition-all transform active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Harvest Crop!
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
