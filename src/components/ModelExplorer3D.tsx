import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Box, Layers, RotateCw, Sparkles, ZoomIn, Info, Check } from 'lucide-react';

interface ModelItem {
  id: string;
  name: string;
  category: 'Crops & Nature' | 'Organic Foods' | 'Characters & Animals' | 'Green Tech & Tools';
  path: string;
  description: string;
  educationalFact: string;
}

const MODEL_CATALOG: ModelItem[] = [
  {
    id: 'crop_carrot',
    name: 'Nile Carrot Crop',
    category: 'Crops & Nature',
    path: '/nature/crop_carrot.glb',
    description: 'Root vegetable rich in beta-carotene, taproot physiology and leafy foliage.',
    educationalFact: 'Carrots were originally purple and yellow in historical Egypt and Persia before orange varieties were cultivated in the 17th century!',
  },
  {
    id: 'crop_pumpkin',
    name: 'Giant Oasis Pumpkin',
    category: 'Crops & Nature',
    path: '/nature/crop_pumpkin.glb',
    description: 'Cucurbitaceae family squash featuring thick rind, high seed count and climbing tendrils.',
    educationalFact: 'Pumpkins produce edible flowers! Female flowers have small swollen baby pumpkins at their base and require bee cross-pollination.',
  },
  {
    id: 'crop_melon',
    name: 'Sinai Sweet Melon',
    category: 'Crops & Nature',
    path: '/nature/crop_melon.glb',
    description: 'Drought-tolerant sweet melon with ribbed rind and high hydration index.',
    educationalFact: 'Melons develop high sugar content when daytime temperatures are high and night temperatures cool down gradually.',
  },
  {
    id: 'tree_oak',
    name: 'Deciduous Oak Tree',
    category: 'Crops & Nature',
    path: '/nature/tree_oak.glb',
    description: 'Hardwood tree providing windbreaks, shade canopy and bird nesting habitats.',
    educationalFact: 'A mature tree absorbs up to 48 pounds of CO₂ per year and releases enough oxygen for two human beings!',
  },
  {
    id: 'food_strawberry',
    name: 'Fresh Red Strawberry',
    category: 'Organic Foods',
    path: '/food/strawberry.glb',
    description: 'Aggregate accessory fruit whose seeds (achenes) are carried on the outer skin.',
    educationalFact: 'Strawberries are the only fruit that wear their seeds on the outside! An average strawberry has about 200 tiny seeds.',
  },
  {
    id: 'food_apple',
    name: 'Crisp Red Apple',
    category: 'Organic Foods',
    path: '/food/apple.glb',
    description: 'Pome fruit rich in soluble dietary pectin and polyphenols.',
    educationalFact: 'Apples float in water because 25% of their internal volume is made up of air pockets!',
  },
  {
    id: 'food_honey',
    name: 'Raw Clover Honey Jar',
    category: 'Organic Foods',
    path: '/food/honey.glb',
    description: 'Natural nectar enzyme-ripened by honeybees with natural antimicrobial properties.',
    educationalFact: 'Archaeologists found 3,000-year-old pots of honey in ancient Egyptian tombs that are still perfectly edible!',
  },
  {
    id: 'char_oobi',
    name: 'Foxy Farm Companion (Oobi)',
    category: 'Characters & Animals',
    path: '/platformer/character-oobi.glb',
    description: 'Farm helper mascot assisting with automated seed dispersal.',
    educationalFact: 'Companion automation allows students to monitor soil moisture and temperature in real-time.',
  },
  {
    id: 'gold_coin',
    name: 'Impact Hub Eco Coin',
    category: 'Green Tech & Tools',
    path: '/platformer/coin-gold.glb',
    description: 'Gamification reward earned through real academic problem-solving.',
    educationalFact: 'Gamification improves student retention of STEM concepts by up to 34% through active loop reinforcement.',
  },
  {
    id: 'star_gem',
    name: 'Knowledge Star Trophy',
    category: 'Green Tech & Tools',
    path: '/platformer/star.glb',
    description: 'Awarded for completing complex math and biological homework quests.',
    educationalFact: 'Consistent problem solving builds neural pathways and long-term scientific intuition!',
  },
];

export const ModelExplorer3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedModel, setSelectedModel] = useState<ModelItem>(MODEL_CATALOG[0]);
  const [isWireframe, setIsWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 450;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x090d16);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(3, 2.5, 4);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 2.0;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x60a5fa, 2);
    dirLight1.position.set(5, 10, 7);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xf59e0b, 1.5);
    dirLight2.position.set(-5, -5, -5);
    scene.add(dirLight2);

    // Studio Pedestal
    const pedestal = new THREE.Mesh(
      new THREE.CylinderGeometry(2, 2.2, 0.2, 32),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4, metalness: 0.6 })
    );
    pedestal.position.y = -0.8;
    scene.add(pedestal);

    // Grid Floor Helper
    const grid = new THREE.GridHelper(8, 16, 0x38bdf8, 0x1e293b);
    grid.position.y = -0.9;
    scene.add(grid);

    let loadedObject: THREE.Object3D | null = null;
    setIsLoading(true);
    setLoadError(false);

    const loader = new GLTFLoader();
    loader.load(
      selectedModel.path,
      (gltf) => {
        setIsLoading(false);
        loadedObject = gltf.scene;

        // Auto center and scale
        const box = new THREE.Box3().setFromObject(loadedObject);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        const maxAxis = Math.max(size.x, size.y, size.z);
        if (maxAxis > 0) {
          const scale = 2.0 / maxAxis;
          loadedObject.scale.set(scale, scale, scale);
        }

        loadedObject.position.x = -center.x * (loadedObject.scale.x || 1);
        loadedObject.position.y = -center.y * (loadedObject.scale.y || 1) + 0.2;
        loadedObject.position.z = -center.z * (loadedObject.scale.z || 1);

        loadedObject.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            if (mesh.material) {
              if (Array.isArray(mesh.material)) {
                mesh.material.forEach((m) => {
                  if ('wireframe' in m) {
                    (m as any).wireframe = isWireframe;
                  }
                });
              } else if ('wireframe' in mesh.material) {
                (mesh.material as any).wireframe = isWireframe;
              }
            }
          }
        });

        scene.add(loadedObject);
      },
      undefined,
      (err) => {
        console.warn('Could not load 3D GLB directly, using stylized geometry representation:', err);
        setIsLoading(false);
        setLoadError(false);

        // Stylized 3D geometric backup
        const geo = new THREE.DodecahedronGeometry(1, 1);
        const mat = new THREE.MeshStandardMaterial({
          color: 0x38bdf8,
          wireframe: isWireframe,
          roughness: 0.3,
          metalness: 0.5,
        });
        loadedObject = new THREE.Mesh(geo, mat);
        loadedObject.position.y = 0.2;
        scene.add(loadedObject);
      }
    );

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

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
      cancelAnimationFrame(animationFrameId);
      controls.dispose();
      renderer.dispose();
    };
  }, [selectedModel, isWireframe, autoRotate]);

  return (
    <div id="model-explorer-container" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <Box className="w-7 h-7 text-amber-400" />
            3D Botanical & Asset Lab
          </h2>
          <p className="text-sm text-slate-400">
            Interactive 3D model viewer — inspect plant anatomy, farming tech, and organic crop specimens.
          </p>
        </div>

        {/* View Controls */}
        <div className="flex items-center gap-2">
          <button
            id="btn-toggle-autorotate"
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
              autoRotate
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
            Auto-Spin
          </button>
          <button
            id="btn-toggle-wireframe"
            onClick={() => setIsWireframe(!isWireframe)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
              isWireframe
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Wireframe
          </button>
        </div>
      </div>

      {/* Main Grid: 3D Stage + Catalog Picker */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 3D Canvas Card */}
        <div className="lg:col-span-8 rounded-2xl overflow-hidden bg-slate-900/90 border border-slate-800 shadow-2xl relative">
          <div ref={containerRef} className="w-full h-[420px] sm:h-[480px] cursor-grab active:cursor-grabbing" />

          {/* Floating Model Title & Badge */}
          <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-700/60 shadow-lg">
            <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">
              {selectedModel.category}
            </span>
            <h3 className="text-base font-bold text-white">{selectedModel.name}</h3>
          </div>

          <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-slate-700 text-xs shadow-xl">
            <div className="flex items-start gap-2.5">
              <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-slate-200 font-medium">{selectedModel.description}</p>
                <p className="text-emerald-300 font-semibold mt-1">💡 Science Fact: {selectedModel.educationalFact}</p>
              </div>
            </div>
          </div>

          {isLoading && (
            <div className="absolute inset-0 bg-slate-950/70 flex items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
                <span className="text-xs text-slate-300 font-semibold">Loading 3D Mesh...</span>
              </div>
            </div>
          )}
        </div>

        {/* Model Selector Sidebar */}
        <div className="lg:col-span-4 space-y-3 max-h-[480px] overflow-y-auto pr-1">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Choose Specimen to Inspect ({MODEL_CATALOG.length})
          </div>
          {MODEL_CATALOG.map((model) => {
            const isSelected = selectedModel.id === model.id;
            return (
              <button
                key={model.id}
                id={`model-select-${model.id}`}
                onClick={() => setSelectedModel(model)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-500/50 text-white shadow-lg shadow-amber-500/10'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="text-xs font-semibold text-amber-400/80 uppercase">
                    {model.category}
                  </div>
                  <div className="text-sm font-bold text-white mt-0.5">{model.name}</div>
                  <div className="text-xs text-slate-400 line-clamp-1 mt-1">
                    {model.description}
                  </div>
                </div>
                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
