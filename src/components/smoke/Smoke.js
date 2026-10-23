import { useEffect, useRef } from 'react';
import smokeImg from '../../assets/smoke.png';
import * as THREE from 'three';
import './smoke.css';

export default function Smoke() {
	const ref = useRef();

	useEffect(() => {
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, transparent: true });
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);

		if (ref.current) {
			ref.current.appendChild(renderer.domElement);
		}

		camera.position.z = 1000;

		const manager = new THREE.LoadingManager();

		manager.onStart = function () {
			console.log('started');
		};

		manager.onLoad = function () {
			console.log('loaded');
			animate();
		};

		manager.onError = function () {
			console.log('error');
		};

		scene.fog = new THREE.FogExp2(0x141414, 0.004);
		const spotlight = new THREE.SpotLight(0x141414, 100, 0, Math.PI / 4, 0);
		spotlight.position.set(500, 500, 1000); // Adjust these coordinates as you see fit.
		spotlight.castShadow = true;
		spotlight.penumbra = 0.5;
		spotlight.decay = 0.8;
		spotlight.distance = 2000;
		scene.add(spotlight);
		const sunMaterial = new THREE.SpriteMaterial({ color: 0x141414, fog: true });
		const sunSprite = new THREE.Sprite(sunMaterial);
		sunSprite.scale.set(1000, 1000, 1);
		sunSprite.position.copy(spotlight.position);
		scene.add(sunSprite);
		renderer.shadowMap.enabled = true;

		/* Smoke management
		 *********************************************************************************************/
		const smokeTexture = new THREE.TextureLoader(manager).load(smokeImg);
		const smokeGeometry = new THREE.PlaneGeometry(300, 300);
		const smokeMaterial = new THREE.MeshLambertMaterial({
			map: smokeTexture,
			opacity: 0.5,
			transparent: true,
			emissive: new THREE.Color('#edd1b5'),
			emissiveIntensity: 2,
			displacementSize: 1
		});

		const planet = new THREE.Mesh(smokeGeometry, smokeMaterial);
		planet.renderOrder = 1;
		scene.add(planet);

		const clock = new THREE.Clock();
		const smokeParticles = [];

		for (let j = 0; j < 90; j++) {
			const smokeElement = new THREE.Mesh(smokeGeometry, smokeMaterial);
			smokeElement.scale.set(2, 2, 2);
			smokeElement.position.set(Math.random() * 1000 - 500, Math.random() * 1000 - 500, Math.random() * 1000 - 100);
			smokeElement.rotation.z = Math.random() * 360;

			scene.add(smokeElement);
			smokeParticles.push(smokeElement);
		}

		const animate = () => {
			requestAnimationFrame(animate);

			const delta = clock.getDelta();
			for (let k = 0; k < smokeParticles.length; k++) {
				smokeParticles[k].rotation.z += delta * 0.2;
			}
			renderer.render(scene, camera);
		};

		const handleResize = () => {
			const width = window.innerWidth;
			const height = window.innerHeight;

			camera.aspect = width / height;
			camera.updateProjectionMatrix();

			renderer.setSize(width, height);
			renderer.setPixelRatio(window.devicePixelRatio);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			smokeTexture.dispose();
			smokeGeometry.dispose();
			smokeMaterial.dispose();
			clock.stop();
		};
	}, []);

	return (
		<div className='canvas-container'>
			<div ref={ref} className='canvas-content' />
			<div className='background-image' />
		</div>
	);
}
