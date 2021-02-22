# Package Requirements
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity

# Local Requirements
from ..models import db, River


# Blueprint Declaration
river = Blueprint('rivers', __name__)


@river.route('/')
@jwt_required()
def get_rivers():
    # return all rivers ordered by name
    rivers = []
    river_objects = River.query.order_by(River.name).all()
    for river_obj in river_objects:
        river = river_obj.to_dict()
        rivers.append(river)
    return jsonify(rivers=rivers), 200


@river.route('/accesses/<id>/', methods=["GET", "PUT"])
@jwt_required()
def accesses_by_river(id):

    # GET path
    if request.method == "GET":
        access_list = []
        river_obj = River.query.filter_by(id=id).first()
        access_objects = river_obj.accesses
        for access in access_objects:
            access_list.append(access.to_dict())

        return jsonify(accesses=access_list), 200

    if request.method == "PUT":
        return jsonify(message="reached accesses PUT route successfully"), 200
