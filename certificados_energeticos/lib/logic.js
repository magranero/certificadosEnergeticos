/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
 /**
 * Sample transaction processor function.
 * @param {org.example.biznet.EmisionCertficado} tx The sample transaction instance.
 * @transaction
 */
function EmisionCertficado(tx) {

    // Grabamos la nota vieja en el caso que la hubiera.
    var viejaNota = tx.asset.nota;

    // Grabamos la nota nueva que se emite.
    tx.asset.nota = tx.nuevaNota;

    // Actualizamos la hora y fecha de la emisión.
    now = tx.fechaEmision;
  
    // Get the asset registry for the asset.
    return getAssetRegistry('org.example.biznet.CertificadoEnergetico')
        .then(function (assetRegistry) {

            // Update the asset in the asset registry.
            return assetRegistry.update(tx.asset);

        })
        .then(function () {

            // Emit an event for the modified asset.
            var event = getFactory().newEvent('org.example.biznet', 'EmisionCertificado');
            event.asset = tx.asset;
            event.viejaNota = viejaNota;
            event.nuevaNota = tx.nuevaNota;
            emit(event);

        });

}
