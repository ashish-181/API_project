const DB = require('./db_models');

exports.createReport = async(req,res) =>{
    try{
        const report = await DB.findOne({
            cmdtyID : req.body.cmdtyID,
            marketID : req.body.marketID
        });
        if(!report){ 
            const newReport = await DB.create({
                userID      : req.body.userID,
                marketID    : req.body.marketID,
                marketName  : req.body.marketName,
                marketType  : req.body.marketType,
                cmdtyID     : req.body.cmdtyID,
                cmdtyName   : req.body.cmdtyName,
                priceUnit   : req.body.priceUnit,
                convFctr    : req.body.convFctr,
                price       : req.body.price / req.body.convFctr,
                users       : [req.body.userID]
            });
            res.send(`Success reportID : ${newReport._id}`);
        }else{ // for aggregate report
            const unit = "KG";
            report.priceUnit = unit;
            //console.log(report.priceUnit);
            report.price = ( (req.body.price / req.body.convFctr) + report.price )/2;
            report.users.push(req.body.userID);  
            
            await report.save();

            res.status(200).json({
                status   : 'sucess',
                reportID : report._id
            });
        }
    }
    catch(err){
        res.status(400).send(`Error : ${err}`);
        console.log(err);
    }
}

exports.getReport = async (req,res) => {
    try{
        const report = await DB.findById(req.query.reportID)
        if(report){
            res.status(200).json({
                cmdtyName   : report.cmdtyName,
                cmdtyID     : report.cmdtyID,                
                marketID    : report.marketID,
                marketName  : report.marketName,
                users       : report.users,
                timestamp   : report.timestamps,
                priceUnit   : report.priceUnit,
                price       : report.price             
                
            });
        }else{
            throw new Error();
        }
    }
    catch(err){
        res.status(400).send(`Error occured : ${err}` );
        console.log(err);
    }
}