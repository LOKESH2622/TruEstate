const salesService = require('../services/salesService');

const salesController = {
    getSales: (req, res) => {
        try {
            const {
                search = '',
                    regions = '',
                    genders = '',
                    ageMin = '',
                    ageMax = '',
                    categories = '',
                    tags = '',
                    paymentMethods = '',
                    dateFrom = '',
                    dateTo = '',
                    sortBy = 'date',
                    sortOrder = 'desc',
                    page = 1,
                    limit = 10
            } = req.query;

            const filters = {
                search: search.trim(),
                regions: regions ? regions.split(',').filter(Boolean) : [],
                genders: genders ? genders.split(',').filter(Boolean) : [],
                ageMin: ageMin ? parseInt(ageMin) : null,
                ageMax: ageMax ? parseInt(ageMax) : null,
                categories: categories ? categories.split(',').filter(Boolean) : [],
                tags: tags ? tags.split(',').filter(Boolean) : [],
                paymentMethods: paymentMethods ? paymentMethods.split(',').filter(Boolean) : [],
                dateFrom: dateFrom || null,
                dateTo: dateTo || null
            };

            const sortOptions = {
                sortBy,
                sortOrder: sortOrder.toLowerCase() === 'asc' ? 'asc' : 'desc'
            };

            const pagination = {
                page: Math.max(1, parseInt(page)),
                limit: Math.max(1, Math.min(100, parseInt(limit)))
            };

            const result = salesService.getSales(filters, sortOptions, pagination);
            res.json(result);
        } catch (error) {
            console.error('Error in getSales:', error);
            res.status(500).json({
                error: 'Failed to fetch sales data'
            });
        }
    },

    getFilterOptions: (req, res) => {
        try {
            const options = salesService.getFilterOptions();
            res.json(options);
        } catch (error) {
            console.error('Error in getFilterOptions:', error);
            res.status(500).json({
                error: 'Failed to fetch filter options'
            });
        }
    },

    getSaleById: (req, res) => {
        try {
            const {
                id
            } = req.params;
            const sale = salesService.getSaleById(id);

            if (!sale) {
                return res.status(404).json({
                    error: 'Sale not found'
                });
            }

            res.json(sale);
        } catch (error) {
            console.error('Error in getSaleById:', error);
            res.status(500).json({
                error: 'Failed to fetch sale'
            });
        }
    }
};

module.exports = salesController;