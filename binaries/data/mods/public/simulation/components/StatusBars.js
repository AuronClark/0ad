function StatusBars() {}

StatusBars.prototype.Schema =
	"<element name='BarWidth'>" +
		"<data type='decimal'/>" +
	"</element>" +
	"<element name='BarHeight'>" +
		"<data type='decimal'/>" +
	"</element>" +
	"<element name='HeightOffset'>" +
		"<data type='decimal'/>" +
	"</element>";

// TODO: should add rank icon too

StatusBars.prototype.Init = function()
{
	this.enabled = false;
};

StatusBars.prototype.SetEnabled = function(enabled)
{
	// Quick return if no change
	if (enabled == this.enabled)
		return;

	// Update the displayed sprites

	this.enabled = enabled;

	if (enabled)
		this.RegenerateSprites();
	else
		this.ResetSprites();
};

StatusBars.prototype.OnHealthChanged = function(msg)
{
	if (this.enabled)
		this.RegenerateSprites();
};

StatusBars.prototype.OnResourceSupplyChanged = function(msg)
{
	if (this.enabled)
		this.RegenerateSprites();
};

StatusBars.prototype.ResetSprites = function()
{
	var cmpOverlayRenderer = Engine.QueryInterface(this.entity, IID_OverlayRenderer);
	cmpOverlayRenderer.Reset();
};

StatusBars.prototype.RegenerateSprites = function()
{
	var cmpOverlayRenderer = Engine.QueryInterface(this.entity, IID_OverlayRenderer);
	cmpOverlayRenderer.Reset();

	// Size of health bar (in world-space units)
	var width = +this.template.BarWidth;
	var height = +this.template.BarHeight;

	// World-space offset from the unit's position
	var offset = { "x": 0, "y": +this.template.HeightOffset, "z": 0 };

	// Billboard offset of next bar
	var yoffset = 0;

	var AddBar = function(type, amount)
	{
		cmpOverlayRenderer.AddSprite(
			"art/textures/ui/session/icons/"+type+"_bg.png",
			{ "x": -width/2, "y": -height/2 + yoffset }, { "x": width/2, "y": height/2 + yoffset },
			offset
		);

		cmpOverlayRenderer.AddSprite(
			"art/textures/ui/session/icons/"+type+"_fg.png",
			{ "x": -width/2, "y": -height/2 + yoffset }, { "x": width*(amount - 0.5), "y": height/2 + yoffset },
			offset
		);

		yoffset -= height * 1.2;
	};

	var cmpHealth = Engine.QueryInterface(this.entity, IID_Health);
	if (cmpHealth)
	{
		AddBar("health", cmpHealth.GetHitpoints() / cmpHealth.GetMaxHitpoints());
	}

	var cmpResourceSupply = Engine.QueryInterface(this.entity, IID_ResourceSupply);
	if (cmpResourceSupply)
	{
		AddBar("supply", cmpResourceSupply.GetCurrentAmount() / cmpResourceSupply.GetMaxAmount());
	}
};

Engine.RegisterComponentType(IID_StatusBars, "StatusBars", StatusBars);
