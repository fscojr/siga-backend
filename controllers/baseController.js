const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.deleteOne = Model => async (req, res, next) => {
    try {
        const doc = await Model.findByIdAndDelete(req.params.id);

        if (!doc) {
            return next(new AppError(404, 'fail', 'No document found with that id'), req, res, next);
        }

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        next(error);
    }
};

exports.updateOne = async (Model, req, res, next) => {

    try {
        const doc = await Model.findOneAndUpdate(req.params.query, req.body, {
            new: true,
            runValidators: true,
            upsert: true
        });

        if (!doc) {
            return next(new AppError(404, 'fail', 'No document found with that id'), req, res, next);
        }

        res.status(200).json({
            status: 'success',
            data: {
                doc
            }
        });

    } catch (error) {
        next(error);
    }
};

exports.createOne = async (Model, req, res, next) => {
    try {
        const doc = await Model.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                doc
            }
        });

    } catch (error) {
        next(error);
    }
};

exports.getOne = Model => async (req, res, next) => {
    try {
        const doc = await Model.findById(req.params.id);

        if (!doc) {
            return next(new AppError(404, 'fail', 'No document found with that id'), req, res, next);
        }

        res.status(200).json({
            status: 'success',
            data: {
                doc
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.getAll = Model => async (req, res, next) => {
    try {
        const features = new APIFeatures(Model.find(), req.query)
            .sort()
            .paginate();

        const doc = await features.query;

        res.status(200).json({
            status: 'success',
            results: doc.length,
            data: {
                data: doc
            }
        });

    } catch (error) {
        next(error);
    }

};

exports.findOne = async (Model, req, res, next) => {
    try {
        const data = await Model.findOne(req.params.query);

        if (!data) {
            return next(new AppError(404, 'fail', 'Nenhum documento encontrado'), req, res, next);
        }

        res.status(200).json({
            status: 'success',
            data
        });

        return data
    } catch (error) {
        next(error);
    }
};

exports.findMany = async (Model, req, res, next) => {
    try {
        const data = await Model.find(req.params.query);

        if (!data) {
            return next(new AppError(404, 'fail', 'Nenhum documento encontrado'), req, res, next);
        }

        res.status(200).json({
            status: 'success',
            data
        });

        return data
    } catch (error) {
        next(error);
    }
};
