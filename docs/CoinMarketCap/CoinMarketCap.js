(function () {
	var myConnector = tableau.makeConnector();

	myConnector.getSchema = function (schemaCallback) {
		var cols = [{
			id: "id",
			dataType: tableau.dataTypeEnum.string
		}, {
			id: "name",
			dataType: tableau.dataTypeEnum.string
		}, {
			id: "symbol",
			dataType: tableau.dataTypeEnum.string
		}, {
			id: "rank",
			dataType: tableau.dataTypeEnum.int
		}, {
			id: "price_usd",
			dataType: tableau.dataTypeEnum.float
		}, {
			id: "price_btc",
			dataType: tableau.dataTypeEnum.float
		}, {
			id: "24h_volume_usd",
			dataType: tableau.dataTypeEnum.float
		}, {
			id: "market_cap_usd",
			dataType: tableau.dataTypeEnum.float
		}, {
			id: "available_supply",
			dataType: tableau.dataTypeEnum.float
		}, {
			id: "total_supply",
			dataType: tableau.dataTypeEnum.float
		}, {
			id: "max_supply",
			dataType: tableau.dataTypeEnum.float
		}, {
			id: "percent_change_1h",
			dataType: tableau.dataTypeEnum.float
		}, {
			id: "percent_change_24h",
			dataType: tableau.dataTypeEnum.float
		}, {
			id: "percent_change_7d",
			dataType: tableau.dataTypeEnum.float
		}, {
			id: "last_updated",
			dataType: tableau.dataTypeEnum.string
		}];

		var tableSchema = {
			id: "CoinMarketCap",
			alias: "Cryptocurrency Market Capitalizations",
			columns: cols
		};

		schemaCallback([tableSchema]);
	};

	myConnector.getData = function(table, doneCallback) {
		$.getJSON("https://api.coinmarketcap.com/v1/ticker/?limit=0", function(resp) {
			var feat = resp,
				tableData = [];

			// Iterate over the JSON object
			for (var i = 0, len = feat.length; i < len; i++) {
				tableData.push({
					"id": feat[i].id,
					"name": feat[i].name,
					"symbol": feat[i].symbol,
					"rank": feat[i].rank,
					"price_usd": feat[i].price_usd,
					"price_btc": feat[i].price_btc,
					"24h_volume_usd": feat[i]["24h_volume_usd"],
					"market_cap_usd": feat[i].market_cap_usd,
					"available_supply": feat[i].available_supply,
					"total_supply": feat[i].total_supply,
					"max_supply": feat[i].max_supply,
					"percent_change_1h": feat[i].percent_change_1h,
					"percent_change_24h": feat[i].percent_change_24h,
					"percent_change_7d": feat[i].percent_change_7d,
					"last_updated": feat[i].last_updated

				});
			}

			table.appendRows(tableData);
			doneCallback();
		});
	};

	tableau.registerConnector(myConnector);
})();

$(document).ready(function () {
	$("#submitButton").click(function () {
		tableau.connectionName = "CoinMarketCap Feed";
		tableau.submit();
	});
});
