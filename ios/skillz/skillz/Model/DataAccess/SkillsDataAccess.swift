//
//  SkillsDataAccess.swift
//  skillz
//
//  Created by Florent Capon on 12/01/2016.
//  Copyright © 2016 Xebia IT Architects. All rights reserved.
//

import UIKit
import RealmSwift
import SwiftTask

public typealias SkillsTask = Task<ProgressTask, [Skill], NSError>

public class SkillsDataAccess: AbstractDataAccess {
    init() {
        super.init(root: NetworkSettings.root())
    }

    public func getAllSkills() -> SkillsTask {
        let task = SkillsTask { [weak self] progress, fulfill, reject, configure in
            self?.GET(Endpoints.Skills.rawValue).validate()
                .responseJSON { response in
                    if let JSON: NSMutableArray = response.result.value as? NSMutableArray {
                        let realm = try! RealmStore.inMemoryStore()
                        try! realm.write({ () -> Void in
                            var skills = [Skill]()
                            for skillDictionary in JSON {
                                let skill = try! realm.create(Skill.self, value: skillDictionary)
                                skills.append(skill)
                            }
                            fulfill(skills)
                        })
                    }
            }
        }
        
        return task
    }
}