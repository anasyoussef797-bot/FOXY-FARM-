// High-fidelity Web Audio API Sound Synthesizer for "المزرعة السعيدة" (Happy Farm)
// Generates the nostalgic sound effects & signature cheerful farm music purely via Web Audio API.

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isBgmPlaying: boolean = false;
  private bgmTimeout: any = null;
  private bgmStep: number = 0;

  constructor() {
    if (typeof window !== 'undefined') {
      const savedMute = localStorage.getItem('happy_farm_muted');
      this.isMuted = savedMute === 'true';
    }
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('happy_farm_muted', String(this.isMuted));
    }
    if (this.isMuted && this.isBgmPlaying) {
      this.stopBGM();
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  // Classic Wooden Button Click (صوت نقرة الأزرار الخشبية)
  public playClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(360, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(180, this.ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.04);
  }

  // Iconic Happy Farm Soil Plowing / Digging (صوت حراثة الأرض بالمجرفة)
  public playPlow() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    // Low thump + gritty noise burst
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.12);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.12);

    // Gritty crunch
    this.playNoiseBurst(0.08, 0.15, 600);
  }

  // Iconic Happy Farm Seed Planting (صوت وضع البذور في التراب)
  public playPlant() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.exponentialRampToValueAtTime(520, now + 0.08);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  }

  // Iconic Happy Farm Watering Can (صوت رش الماء العذب)
  public playWater() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Dual descending swooshes
    [580, 440, 320].forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.04);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.6, now + idx * 0.04 + 0.09);

      gain.gain.setValueAtTime(0.18, now + idx * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.04);
      osc.stop(now + idx * 0.04 + 0.1);
    });

    this.playNoiseBurst(0.12, 0.1, 1400);
  }

  // Iconic Happy Farm Sickle Harvest + Golden Chimes (صوت حصاد المنجل + رنين الذهب)
  public playHarvest() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    // 1. Crisp Sickle blade swish (صوت سحبة المنجل)
    const swish = this.ctx.createOscillator();
    const swishGain = this.ctx.createGain();
    swish.type = 'triangle';
    swish.frequency.setValueAtTime(1200, now);
    swish.frequency.exponentialRampToValueAtTime(400, now + 0.09);
    swishGain.gain.setValueAtTime(0.2, now);
    swishGain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
    swish.connect(swishGain);
    swishGain.connect(this.ctx.destination);
    swish.start(now);
    swish.stop(now + 0.09);

    // 2. Sparkle Coin Cascade (رنين القطع النقدية الذهبية المتتالية)
    const notes = [659.25, 783.99, 1046.5, 1318.51, 1567.98]; // E5, G5, C6, E6, G6
    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + 0.04 + idx * 0.045);

      gain.gain.setValueAtTime(0.22, now + 0.04 + idx * 0.045);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04 + idx * 0.045 + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + 0.04 + idx * 0.045);
      osc.stop(now + 0.04 + idx * 0.045 + 0.25);
    });
  }

  // Classic Gold Coin Ding (صوت رنين الذهب)
  public playCoin() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [987.77, 1318.51]; // B5 -> E6
    notes.forEach((freq, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.05);

      gain.gain.setValueAtTime(0.25, now + i * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.28);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + i * 0.05);
      osc.stop(now + i * 0.05 + 0.28);
    });
  }

  // Dinar / Cash register chime (صوت الدنانير الخاصة)
  public playDinar() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [523.25, 783.99, 1046.5, 1567.98, 2093.0];
    notes.forEach((freq, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.04);
      gain.gain.setValueAtTime(0.22, now + i * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.04 + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + i * 0.04);
      osc.stop(now + i * 0.04 + 0.35);
    });
  }

  // ==========================================
  // Animal Sound Synthesizers (أصوات الحيوانات التفاعلية)
  // ==========================================

  // 1. Cow Moo (خوار البقرة)
  public playCowMoo() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, now);
    filter.frequency.exponentialRampToValueAtTime(280, now + 0.6);

    osc.frequency.setValueAtTime(140, now);
    osc.frequency.linearRampToValueAtTime(165, now + 0.2);
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.7);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.22, now + 0.12);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.7);
  }

  // 2. Chicken Cluck & Cackle (قوقأة الدجاجة وصياحها)
  public playChickenCluck() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Series of 3 rhythmic clucks: bok... bok... bawk!
    const clucks = [
      { f1: 520, f2: 380, dur: 0.08, delay: 0, vol: 0.18 },
      { f1: 580, f2: 400, dur: 0.09, delay: 0.1, vol: 0.2 },
      { f1: 720, f2: 440, dur: 0.18, delay: 0.22, vol: 0.24 },
    ];

    clucks.forEach((c) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'triangle';
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(900, now + c.delay);
      filter.Q.setValueAtTime(3, now + c.delay);

      osc.frequency.setValueAtTime(c.f1, now + c.delay);
      osc.frequency.exponentialRampToValueAtTime(c.f2, now + c.delay + c.dur);

      gain.gain.setValueAtTime(0.01, now + c.delay);
      gain.gain.linearRampToValueAtTime(c.vol, now + c.delay + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + c.delay + c.dur);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + c.delay);
      osc.stop(now + c.delay + c.dur);
    });
  }

  // 3. Sheep Baa / Bleat (ثغاء الخروف الصوفي مااااء)
  public playSheepBaa() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const vibrato = this.ctx.createOscillator();
    const vibratoGain = this.ctx.createGain();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Vibrato for natural sheep throat wobble (تردد حلقي للخروف)
    vibrato.frequency.setValueAtTime(14, now);
    vibratoGain.gain.setValueAtTime(18, now);
    vibrato.connect(osc.frequency);

    osc.type = 'sawtooth';
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(750, now);
    filter.Q.setValueAtTime(2.5, now);

    osc.frequency.setValueAtTime(270, now);
    osc.frequency.linearRampToValueAtTime(320, now + 0.15);
    osc.frequency.exponentialRampToValueAtTime(230, now + 0.55);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    vibrato.start(now);
    osc.start(now);
    vibrato.stop(now + 0.55);
    osc.stop(now + 0.55);
  }

  // 4. Arabian Horse Whinny / Neigh (صهيل الحصان العربي)
  public playHorseNeigh() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Rapid whinny trill + descending snort
    const osc = this.ctx.createOscillator();
    const vibrato = this.ctx.createOscillator();
    const vibratoGain = this.ctx.createGain();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    vibrato.frequency.setValueAtTime(22, now);
    vibratoGain.gain.setValueAtTime(45, now);
    vibrato.connect(osc.frequency);

    osc.type = 'sawtooth';
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1800, now);

    osc.frequency.setValueAtTime(650, now);
    osc.frequency.exponentialRampToValueAtTime(980, now + 0.18);
    osc.frequency.exponentialRampToValueAtTime(420, now + 0.65);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    vibrato.start(now);
    osc.start(now);
    vibrato.stop(now + 0.65);
    osc.stop(now + 0.65);

    // Subtle snort noise at the end
    setTimeout(() => {
      this.playNoiseBurst(0.12, 0.1, 800);
    }, 450);
  }

  // 5. Duck Quack (بطبطة البطة وكواك كواك)
  public playDuckQuack() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Two bouncy quacks
    [0, 0.16].forEach((delay, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(680, now + delay);
      filter.Q.setValueAtTime(4, now + delay);

      const startFreq = idx === 0 ? 460 : 420;
      osc.frequency.setValueAtTime(startFreq, now + delay);
      osc.frequency.exponentialRampToValueAtTime(startFreq * 0.65, now + delay + 0.12);

      gain.gain.setValueAtTime(0.01, now + delay);
      gain.gain.linearRampToValueAtTime(0.2, now + delay + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.13);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + delay);
      osc.stop(now + delay + 0.13);
    });
  }

  // 6. Rabbit Squeak & Hop (صوت الأرنب والقفزات اللطيفة)
  public playRabbitHop() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Cute high chirp + soft thump
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(1400, now + 0.06);
    osc.frequency.exponentialRampToValueAtTime(1100, now + 0.14);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.15);

    this.playNoiseBurst(0.06, 0.08, 400);
  }

  // Master Animal Voice Router (تشغيل صوت الحيوان بحسب نوعه)
  public playAnimalSound(animalId: string) {
    if (this.isMuted) return;
    switch (animalId) {
      case 'cow':
        this.playCowMoo();
        break;
      case 'chicken':
        this.playChickenCluck();
        break;
      case 'sheep':
        this.playSheepBaa();
        break;
      case 'horse':
        this.playHorseNeigh();
        break;
      case 'duck':
        this.playDuckQuack();
        break;
      case 'rabbit':
        this.playRabbitHop();
        break;
      default:
        this.playFeed();
        break;
    }
  }

  // Happy Farm Feeding Chime (صوت تغذية الحيوان وجمع الإنتاج)
  public playFeed() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(480, now + 0.08);
    osc.frequency.exponentialRampToValueAtTime(350, now + 0.18);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.22);
  }

  // Level Up / Mission Triumphant Fanfare (موسيقى ترقية المستوى والاحتفال)
  public playVictory() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Classic Happy Farm Level-Up Fanfare
    const fanfareNotes = [
      { f: 523.25, t: 0, d: 0.1 },     // C5
      { f: 659.25, t: 0.1, d: 0.1 },   // E5
      { f: 783.99, t: 0.2, d: 0.1 },   // G5
      { f: 1046.5, t: 0.3, d: 0.15 },  // C6
      { f: 880.0, t: 0.45, d: 0.1 },   // A5
      { f: 1046.5, t: 0.55, d: 0.1 },  // C6
      { f: 1318.51, t: 0.65, d: 0.5 }, // E6
    ];

    fanfareNotes.forEach((n) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(n.f, now + n.t);

      gain.gain.setValueAtTime(0.22, now + n.t);
      gain.gain.exponentialRampToValueAtTime(0.001, now + n.t + n.d);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + n.t);
      osc.stop(now + n.t + n.d);
    });
  }

  // Neighbor Visit chime (صوت زيارة الجيران)
  public playVisit() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    [440, 554.37, 659.25, 880].forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);
      gain.gain.setValueAtTime(0.18, now + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.3);
    });
  }

  // Character-Specific Voice & Pose Audio Synthesis
  public playCharacterVoice(characterId: 'FOXY' | 'ADAM' | 'TALIA' | 'SPARK') {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    switch (characterId) {
      case 'FOXY': {
        // High playful puppy/fennec chirp
        const freqs = [784, 1046.5, 1318.5];
        freqs.forEach((f, i) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, now + i * 0.05);
          osc.frequency.exponentialRampToValueAtTime(f * 1.2, now + i * 0.05 + 0.08);
          gain.gain.setValueAtTime(0.18, now + i * 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.12);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + i * 0.05);
          osc.stop(now + i * 0.05 + 0.12);
        });
        break;
      }
      case 'ADAM': {
        // Energetic bright eureka chime
        const freqs = [587.33, 880, 1174.66];
        freqs.forEach((f, i) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(f, now + i * 0.06);
          gain.gain.setValueAtTime(0.2, now + i * 0.06);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.2);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + i * 0.06);
          osc.stop(now + i * 0.06 + 0.2);
        });
        break;
      }
      case 'TALIA': {
        // Sweet dreamy harp arpeggio
        const freqs = [659.25, 783.99, 987.77, 1318.51];
        freqs.forEach((f, i) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, now + i * 0.05);
          gain.gain.setValueAtTime(0.15, now + i * 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.35);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + i * 0.05);
          osc.stop(now + i * 0.05 + 0.35);
        });
        break;
      }
      case 'SPARK': {
        // Sci-fi robot frequency chirp & power up
        const freqs = [440, 660, 880, 1760];
        freqs.forEach((f, i) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(f, now + i * 0.04);
          osc.frequency.linearRampToValueAtTime(f * 1.5, now + i * 0.04 + 0.04);
          gain.gain.setValueAtTime(0.08, now + i * 0.04);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.04 + 0.09);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + i * 0.04);
          osc.stop(now + i * 0.04 + 0.09);
        });
        break;
      }
    }
  }

  // Noise helper for tactile plowing/water rustle
  private playNoiseBurst(duration: number, volume: number, cutoff: number) {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = cutoff;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(volume, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start();
  }

  // Authentic Cheerful "المزرعة السعيدة" Melody Synthesizer (BGM Loop)
  public startBGM() {
    if (this.isMuted || this.isBgmPlaying) return;
    this.initContext();
    this.isBgmPlaying = true;
    this.bgmStep = 0;

    // Classic cheerful upbeat farm acoustic folk progression
    // C - G - Am - F with playful melody lead
    const melodyPattern = [
      // Bar 1 (C Major)
      { note: 523.25, dur: 0.18, bass: 130.81 }, // C5, C3
      { note: 659.25, dur: 0.18, bass: 196.00 }, // E5, G3
      { note: 783.99, dur: 0.18, bass: 130.81 }, // G5, C3
      { note: 1046.5, dur: 0.36, bass: 196.00 }, // C6, G3
      // Bar 2 (G Major)
      { note: 987.77, dur: 0.18, bass: 98.00 },  // B5, G2
      { note: 783.99, dur: 0.18, bass: 146.83 }, // G5, D3
      { note: 659.25, dur: 0.18, bass: 98.00 },  // E5, G2
      { note: 783.99, dur: 0.36, bass: 146.83 }, // G5, D3
      // Bar 3 (A Minor)
      { note: 880.00, dur: 0.18, bass: 110.00 }, // A5, A2
      { note: 1046.5, dur: 0.18, bass: 164.81 }, // C6, E3
      { note: 1174.66,dur: 0.18, bass: 110.00 }, // D6, A2
      { note: 1318.51,dur: 0.36, bass: 164.81 }, // E6, E3
      // Bar 4 (F Major -> G Turnaround)
      { note: 1046.5, dur: 0.18, bass: 87.31 },  // C6, F2
      { note: 880.00, dur: 0.18, bass: 130.81 }, // A5, C3
      { note: 783.99, dur: 0.18, bass: 98.00 },  // G5, G2
      { note: 523.25, dur: 0.45, bass: 130.81 }, // C5, C3
    ];

    const playNextNote = () => {
      if (!this.isBgmPlaying || this.isMuted || !this.ctx) return;

      const item = melodyPattern[this.bgmStep % melodyPattern.length];
      const now = this.ctx.currentTime;

      // 1. Playful Lead Pluck (Marimba / Acoustic Pluck tone)
      const leadOsc = this.ctx.createOscillator();
      const leadGain = this.ctx.createGain();
      leadOsc.type = 'triangle';
      leadOsc.frequency.setValueAtTime(item.note, now);

      leadGain.gain.setValueAtTime(0.045, now);
      leadGain.gain.exponentialRampToValueAtTime(0.0001, now + item.dur * 1.5);

      leadOsc.connect(leadGain);
      leadGain.connect(this.ctx.destination);
      leadOsc.start(now);
      leadOsc.stop(now + item.dur * 1.5);

      // 2. Warm Bass Note (البيس الإيقاعي للمزرعة)
      const bassOsc = this.ctx.createOscillator();
      const bassGain = this.ctx.createGain();
      bassOsc.type = 'sine';
      bassOsc.frequency.setValueAtTime(item.bass, now);

      bassGain.gain.setValueAtTime(0.035, now);
      bassGain.gain.exponentialRampToValueAtTime(0.0001, now + item.dur * 1.8);

      bassOsc.connect(bassGain);
      bassGain.connect(this.ctx.destination);
      bassOsc.start(now);
      bassOsc.stop(now + item.dur * 1.8);

      this.bgmStep++;
      const stepDurationMs = (item.dur || 0.22) * 1000;
      this.bgmTimeout = setTimeout(playNextNote, stepDurationMs);
    };

    playNextNote();
  }

  public stopBGM() {
    this.isBgmPlaying = false;
    if (this.bgmTimeout) {
      clearTimeout(this.bgmTimeout);
      this.bgmTimeout = null;
    }
  }

  public isBGMActive(): boolean {
    return this.isBgmPlaying;
  }
}

export const soundEngine = new SoundEngine();
