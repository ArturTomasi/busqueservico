/* global module */

var mongoose = require( 'mongoose' );

var uniqueValidator = require('mongoose-unique-validator');

module.exports = function ()
{
    var schemaAttachment = 
    {
        name:   { type: String, required: [ true, 'não pode estar vazio' ] },
        base64: { type: String, required: [ true, 'não pode estar vazio' ] },
        type:   { type: String }
    };

    var schema = mongoose.Schema
    ( {
        name:               { type: String, required: [ true, 'não pode estar vazio'] },
        info:               { type: String  },
        realDate:           { type: Date    },
        estimateDate:       { type: Date,   required: [ true, 'não pode estar vazio'] },
        realValue:          { type: Number  },
        estimateValue:      { type: Number, required: [ true, 'não pode estar vazio'] },
        portion:            { type: Number, required: [ true, 'não pode estar vazio'], default: 1 },
        portionTotal:       { type: Number, required: [ true, 'não pode estar vazio'], default: 1 },
        repet:              { type: Boolean,required: [ true, 'não pode estar vazio'], default: false },
        completionAuto:     { type: Boolean,required: [ true, 'não pode estar vazio'], default: false },
        state:              { type: Number, required: [ true, 'não pode estar vazio'], default: 0 },
        type :              { type: String, required: [ true, 'não pode estar vazio'], enum: [ 'Receita', 'Despesa' ] },
        category:           { type: mongoose.Schema.Types.ObjectId, ref: 'Category',  required: [ true, 'não pode estar vazio'] },
        user:               { type: mongoose.Schema.Types.ObjectId, ref: 'User',       required: [ true, 'não pode estar vazio'] },
        completionType:     { type: mongoose.Schema.Types.ObjectId, ref: 'CompletionType' },
        entity:             { type: mongoose.Schema.Types.ObjectId, ref: 'Entity',    required: [ true, 'não pode estar vazio'] },
        posting:            { type: mongoose.Schema.Types.ObjectId, ref: 'Posting' },
        attachments:        [ schemaAttachment ],
        createAt:           { type: Date,   default: Date.now }
    } );
    
    schema.plugin( uniqueValidator, { message: " está adicionado em outro lançamento." } );
    
    return mongoose.model( 'Postings', schema );
};


