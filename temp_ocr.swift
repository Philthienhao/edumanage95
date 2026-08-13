
import Foundation
import Vision
import AppKit

let imageURL = URL(fileURLWithPath: "/Users/mac/Downloads/Lớp 9:5/1785690419803_1571917558382655922_5256058122092512659_5c51e22e9a3006fd8291b1cc955fec42.jpg")
guard let nsImage = NSImage(contentsOf: imageURL),
      let cgImage = nsImage.cgImage(forProposedRect: nil, context: nil, hints: nil) else { exit(1) }
let sem = DispatchSemaphore(value: 0)
let request = VNRecognizeTextRequest { req, err in
    defer { sem.signal() }
    guard let obs = req.results as? [VNRecognizedTextObservation] else { return }
    for ob in obs {
        if let top = ob.topCandidates(1).first { print(top.string) }
    }
}
request.recognitionLevel = .accurate
try? VNImageRequestHandler(cgImage: cgImage, options: [:]).perform([request])
sem.wait()
