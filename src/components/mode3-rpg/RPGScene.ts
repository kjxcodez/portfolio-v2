import * as Phaser from 'phaser';

export interface InteractiveTarget {
  id: string;
  name: string;
  type: 'skill' | 'project' | 'contribution';
  x: number;
  y: number;
  data: any;
}

export class RPGScene extends Phaser.Scene {
  private player!: Phaser.GameObjects.Rectangle;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: {
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
  };
  
  private currentZone = 'Spawn Portal';
  private targets: InteractiveTarget[] = [];
  private activeTarget: InteractiveTarget | null = null;
  private callbacks: any = null;

  constructor() {
    super('RPGScene');
  }

  create() {
    this.physics.world.setBounds(0, 0, 800, 600);
    
    // Get callbacks passed from React via registry
    this.callbacks = this.game.registry.get('callbacks');

    // 1. Draw Map & Boundaries
    this.add.grid(400, 300, 800, 600, 40, 40, 0x18181b, 0.5, 0x27272a, 0.2);
    
    // Translucent boundaries/walls for division
    this.add.rectangle(400, 180, 800, 4, 0x3f3f46, 0.2);
    this.add.rectangle(400, 420, 800, 4, 0x3f3f46, 0.2);
    this.add.rectangle(250, 300, 4, 240, 0x3f3f46, 0.2);
    this.add.rectangle(550, 300, 4, 240, 0x3f3f46, 0.2);

    // Spawn Pad visual portal ring in center
    this.add.circle(400, 300, 40, 0x3b82f6, 0.05);
    const ring = this.add.graphics();
    ring.lineStyle(2, 0x3b82f6, 0.2);
    ring.strokeCircle(400, 300, 40);

    // 2. Define interactive nodes from shared metadata
    this.targets = [
      // Skill Stones (East: Skills Forest)
      { id: 'react', name: 'React', type: 'skill', x: 670, y: 200, data: { usedIn: ['Percept UI', 'Portfolio', 'SaaS products'] } },
      { id: 'node', name: 'Node', type: 'skill', x: 670, y: 260, data: { usedIn: ['RapidQuest Apps', 'Brainly API', 'Astra Chatbot'] } },
      { id: 'typescript', name: 'TypeScript', type: 'skill', x: 670, y: 320, data: { usedIn: ['FlowCMS', 'VS Code Extensions', 'Portfolio Core'] } },
      { id: 'prisma', name: 'Prisma', type: 'skill', x: 670, y: 380, data: { usedIn: ['FlowCMS', 'URL Shortener', 'WhatsApp App Database'] } },

      // Project Terminals (South: Projects Dungeon)
      { id: 'flowcms', name: 'FlowCMS Terminal', type: 'project', x: 280, y: 510, data: { id: 'flowcms' } },
      { id: 'rune-lang', name: 'Rune Lang Terminal', type: 'project', x: 400, y: 510, data: { id: 'rune-lang' } },
      { id: 'ai-auto-commit', name: 'AI Commit Terminal', type: 'project', x: 520, y: 510, data: { id: 'ai-auto-commit' } },

      // Contribution Board (North: Open Source Citadel)
      { id: 'opensource-board', name: 'Citadel Contribution Board', type: 'contribution', x: 400, y: 90, data: {} }
    ];

    // Draw interactive nodes as clean geometric visual items
    this.targets.forEach(t => {
      if (t.type === 'skill') {
        // Emerald circles for Skill Stones
        this.add.circle(t.x, t.y, 14, 0x10b981, 0.8);
        const glow = this.add.circle(t.x, t.y, 22, 0x10b981, 0.15);
        this.tweens.add({
          targets: glow,
          scale: 1.3,
          alpha: 0,
          duration: 1500,
          repeat: -1
        });
      } else if (t.type === 'project') {
        // Amber squares for Project Terminals
        this.add.rectangle(t.x, t.y, 26, 26, 0xf59e0b, 0.8);
        const glow = this.add.rectangle(t.x, t.y, 34, 34, 0xf59e0b, 0.15);
        this.tweens.add({
          targets: glow,
          scale: 1.3,
          alpha: 0,
          duration: 1500,
          repeat: -1
        });
      } else if (t.type === 'contribution') {
        // Purple board for Open Source Citadel
        this.add.rectangle(t.x, t.y, 90, 24, 0x8b5cf6, 0.8);
        const glow = this.add.rectangle(t.x, t.y, 100, 32, 0x8b5cf6, 0.15);
        this.tweens.add({
          targets: glow,
          scale: 1.2,
          alpha: 0,
          duration: 1500,
          repeat: -1
        });
      }
    });

    // 3. Create Player (32x32 Blue Square)
    this.player = this.add.rectangle(400, 300, 26, 26, 0x3b82f6);
    this.physics.add.existing(this.player);
    (this.player.body as Phaser.Physics.Arcade.Body).setCollideWorldBounds(true);

    // 4. Setup Input Controls
    this.cursors = this.input.keyboard!.createCursorKeys();
    this.wasd = this.input.keyboard!.addKeys({
      W: Phaser.Input.Keyboard.KeyCodes.W,
      A: Phaser.Input.Keyboard.KeyCodes.A,
      S: Phaser.Input.Keyboard.KeyCodes.S,
      D: Phaser.Input.Keyboard.KeyCodes.D,
    }) as any;

    // Trigger zone changes initially
    this.callbacks?.onZoneChange(this.currentZone);
  }

  update() {
    const speed = 180;
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    
    // Stop by default
    body.setVelocity(0);

    // Handle horizontal movements
    if (this.cursors.left.isDown || this.wasd.A.isDown) {
      body.setVelocityX(-speed);
    } else if (this.cursors.right.isDown || this.wasd.D.isDown) {
      body.setVelocityX(speed);
    }

    // Handle vertical movements
    if (this.cursors.up.isDown || this.wasd.W.isDown) {
      body.setVelocityY(-speed);
    } else if (this.cursors.down.isDown || this.wasd.S.isDown) {
      body.setVelocityY(speed);
    }

    // Normalize velocity vector for diagonal movements
    body.velocity.normalize().scale(speed);

    // 5. Quadrant Zone Checks
    let newZone = 'Spawn Portal';
    const px = this.player.x;
    const py = this.player.y;

    if (py < 185) {
      newZone = 'Open Source Citadel';
    } else if (py > 415) {
      newZone = 'Projects Dungeon';
    } else if (px > 545) {
      newZone = 'Skills Forest';
    } else {
      newZone = 'Spawn Portal';
    }

    if (newZone !== this.currentZone) {
      this.currentZone = newZone;
      this.callbacks?.onZoneChange(newZone);
    }

    // 6. Proximity Scanner: check if player is near any interactive targets
    let nearbyTarget: InteractiveTarget | null = null;
    
    for (const t of this.targets) {
      const distance = Phaser.Math.Distance.Between(px, py, t.x, t.y);
      if (distance < 50) {
        nearbyTarget = t;
        break;
      }
    }

    if (nearbyTarget !== this.activeTarget) {
      this.activeTarget = nearbyTarget;
      this.callbacks?.onProximityChange(nearbyTarget);
    }
  }
}
